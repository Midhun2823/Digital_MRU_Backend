import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  delivery: { type: Number,default:0},
  status: { type: String, default: "Items are Processing" },
  date: { type: Date, default: Date.now() }, // when ever we place order this date will be saved with the current date
  payment: { type: Boolean, default: false },
  discount: {type: Number}
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel; 
