import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchaseDatetime: Date,
  amount: Number,
  purchaser: String,
});

ticketSchema.plugin(mongoosePaginate);
export const ticketModel = mongoose.model("Tickets", ticketSchema);
