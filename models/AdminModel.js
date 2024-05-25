import mongoose from "mongoose";

// Define one Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique is used because we should create unique emailID
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    admintype: { type: String, required: true },
    admincategory: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    approved: { type: Boolean, default: false },
  },
  { minimize: false }
);
// minimize false is used because the cartdata will not be create beacuse intially it is empty so we use this
// by this cartdata will be created without passing the value also

const adminModel = mongoose.model.admin || mongoose.model("admin", adminSchema);

export default adminModel;
