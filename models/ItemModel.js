import mongoose from "mongoose";

const foodScheme = new mongoose.Schema({
  name: { type: String, requried: true },
  type: { type: String, requried: true },
  stall_name: { type: String, requried: true },
  category: { type: String, requried: true },
  image: { type: String, requried: true },
  new_price: { type: Number, requried: true },
  old_price: { type: Number, requried: true },
  des: { type: String, requried: true },
  item_time: { type: Number, requried: true },
  available: { type: Boolean, requried: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodScheme)

export default foodModel;
