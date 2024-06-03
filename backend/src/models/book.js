import { Schema, model, Types } from "mongoose";

const bookSchema = new Schema(
  {
    author: { type: String, require: true },
    title: { type: String, require: true },
    frontCoverImage: { type: String, require: true },
    backCoverImage: { type: String, require: true },
    user: [{ type: Types.ObjectId, ref: "Users" }],
    internalPages: [
      {
        pageNumber: { type: Number },
        content: { type: String },
        alignment: { type: String },
        backgroundImage: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const booksModel = model("Books", bookSchema);

export default booksModel;