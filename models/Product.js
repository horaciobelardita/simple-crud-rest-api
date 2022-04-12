import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = model("Product", productSchema);

export default Product;
