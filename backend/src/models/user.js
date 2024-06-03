import { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    books: [{ type: Types.ObjectId, ref: "Books" }],
    role: {
      type: String,
      enum: ["admin", "member"],
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = model("Users", userSchema);

export default userModel;
