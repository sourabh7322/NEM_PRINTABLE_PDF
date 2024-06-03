import { jsPDF } from 'jspdf';
import booksModel from '../models/book.js';

export const generatePDF = async (req, res) => {
  const formData = req.body;

  try {
    const internalPages = JSON.parse(formData.internalPages || '[]');

    const newBook = new booksModel({
      author: formData.author,
      title: formData.title,
      frontCoverImage: req.files.frontImage[0]?.buffer.toString('base64'),
      backCoverImage: req.files.backImage[0]?.buffer.toString('base64'),
      internalPages: internalPages.map((page, index) => ({
        ...page,
        backgroundImage: req.files[`internalBackgroundImage${index}`]?.buffer.toString('base64')
      }))
    });
    await newBook.save();

    const doc = new jsPDF();

    if (newBook.frontCoverImage) {
        const frontImageData = `data:image/jpeg;base64,${newBook.frontCoverImage}`;
        doc.addImage(frontImageData, 'JPEG', 0, 0, 210, 297); 
      }
      

 
    doc.setFontSize(30);
    doc.text(newBook.title, 50, 50);
    doc.setFontSize(20);
    doc.text(`Author: ${newBook.author}`, 50, 60);

    // Add internal pages
    for (const page of newBook.internalPages) {
        doc.addPage(); 
        doc.setFontSize(12);
        doc.text(page.content, 10, 20, { align: page.alignment });
      }


    if (newBook.backCoverImage) {
        const backImageData = `data:image/jpeg;base64,${newBook.backCoverImage}`;
        doc.addPage(); 
        doc.addImage(backImageData, 'JPEG', 0, 0, 210, 297);
        doc.setFontSize(20);
        doc.text(`Author: ${newBook.author}`, 50, 50);
      }

    const pdfBlob = doc.output('blob');
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error });
  }
};