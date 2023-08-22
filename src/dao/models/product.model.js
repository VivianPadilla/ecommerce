import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: "admin",
    required: true,
  },
  images: {
    type: Array,
    items: {
      type: String,
    },
  },
});

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Products", productSchema);
