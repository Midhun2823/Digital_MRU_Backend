import mongoose from "mongoose";
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
const total = `${day}/${month}/${year}, ${hour}:${minute}:${second} ${
  hour < 12 ? "AM" : "PM"
}`;
console.log(total + " cpnsolaw");
const orderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  delivery: { type: Number, default: 0 },
  status: { type: String, default: "Items are Processing" },
  date: {
    type: String,
    default: total,
  },
  ordercanceled: { type: Boolean, default: false }, // when ever we place order this date will be saved with the current date
  payment: { type: Boolean, default: false },
  discount: { type: Number },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
