import foodModel from "../models/ItemModel.js";
import fs from 'fs' //prebuild


// add food item (we can add new food items in our database by this)
const addFood = async(req, res) => {

    // create variable to store the name of the Image 
    let image_filename = `${req.file.filename}` // using this we will soter the uploaded file name in this variable

    const food = new foodModel({
      name: req.body.name,
      type: req.body.type,
      stall_name: req.body.stall_name,
      category: req.body.category,
      image: image_filename,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      des: req.body.des,
      item_time: req.body.item_time,
      available: req.body.available,
      //   when ever we hit this api in the body we will send this details and we will access in the backend using this fuction(addFood)
    });
    try {
      await food.save();
      res.json({ success: true, message: "Food Added" }); //if the product is added successfully this will exceute
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"}) //if we get and error while adding the product this will exceute
    }
}

// all food List 
const listFood = async (req, res) => {
    try {
        // using foodModel we can fetch all the items 
        const foods = await foodModel.find({})
        // foods variable as all the data (items)
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false , message: "Error"})
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id) //find the foodmodel using the id
        fs.unlink(`uploads/${food.image}`, ()=>{}) //image deletion from the folder

        // using we "req.body.id" sholid delete the data from the mongodb database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


//pending to modify
// {
// const stockFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id); //find the foodmodel using the id
   

//     // using we "req.body.id" sholid delete the data from the mongodb database
//     await foodModel.findByIdAndUpdate((req.body.id));
//     res.json({ success: true, message: "Food modified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
// }

export { addFood, listFood, removeFood };