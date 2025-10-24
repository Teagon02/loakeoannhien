import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    //sku: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: false, trim: true },
    price: { type: Number, required: true, index: true },
    discount: { type: Number, required: false },
    description: { type: String, required: false },
    category: { type: String, required: true, trim: true },
    images: { type: [String], required: false },
    status: { type: Boolean, default: true },
    linkReview: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
