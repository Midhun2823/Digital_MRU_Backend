import mongoose from "mongoose";

// Define one Schema 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique is used because we should create unique emailID
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    school: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    designation: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);
// minimize false is used because the cartdata will not be create beacuse intially it is empty so we use this 
// by this cartdata will be created without passing the value also 

const userModel = mongoose.model.user || mongoose.model("user", userSchema)

export default userModel