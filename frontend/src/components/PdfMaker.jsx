import{ useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import pdfjsVersion from 'pdfjs-dist/package.json';

const PdfMaker = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    frontImage: null,
    backImage: null,
    content: '',
    alignment: 'left',
    insertedImages: [],
  });
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'insertedImages') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData.insertedImages, ...Array.from(files)],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    if (formData.frontImage) {
      data.append('frontImage', formData.frontImage);
    }
    if (formData.backImage) {
      data.append('backImage', formData.backImage);
    }
    data.append('content', formData.content);
    data.append('alignment', formData.alignment);
    formData.insertedImages.forEach((image, index) => {
      data.append(`insertedImages`, image);
    });
  
    try {
      const response = await fetch('https://nem-e3.onrender.com/api/books/generate-pdf', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } else {
        alert("User not logged in");
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'generated.pdf';
    link.click();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          name="frontImage"
          placeholder="FrontPage Image"
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          name="backImage"
          placeholder="BackPage Image"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />
        <select name="alignment" value={formData.alignment} onChange={handleChange}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <input
          type="file"
          accept="image/*"
          multiple
          name="insertedImages"
          placeholder="Insert Images"
          onChange={handleChange}
        />
        <button type="submit">Generate PDF</button>
      </form>

      {pdfUrl && (
        <div className="pdf-preview">
          <h3>PDF Preview:</h3>
          <div className="pdf-viewer-container">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion.version}/build/pdf.worker.min.js`}>
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
          <button className="download-button" onClick={handleDownload}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfMaker;