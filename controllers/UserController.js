import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// we create two fuctions

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); // if any account is available then account is stored in the user variable

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter Valid Email",
      });
    }

    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // password means the user enter password | user.password means password in the database

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, user: JSON.stringify(user) });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register User
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmpassword,
    school,
    course,
    branch,
    designation,
    phonenumber,
  } = req.body;
  try {
    // Checking is user already Exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //Valitating Email format and Strong Format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    if (password !== confirmpassword) {
      return res.json({
        success: false,
        message: "Password doesn't match",
      });
    }

    // Password length is greater then 8 character or not
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // if it comes till here means the email is correct and password is correct
    //create one account
    //encrypt the password
    //Hashing user password
    const salt = await bcrypt.genSalt(12); // 15 means more security but it takes time to verify
    const hashedPassword = await bcrypt.hash(password, salt); // by this the password has been hashed

    //create new user using the fields
    const newUser = new userModel({
      name: name, // the second name will be coming form req.body
      email: email,
      password: hashedPassword,
      confirmpassword: password,
      school: school,
      course: course,
      branch: branch,
      designation: designation,
      phonenumber: phonenumber,
    });

    // now we should create token
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
