import express from "express";
import { addFood, listFood, removeFood } from "../controllers/FoodController.js";
import multer from "multer"; // using this we create image storage system

//create express router
const foodRouter = express.Router();
// using this router we can create get, post, and many more methods


// Image Storage Engine cb->callback
//logic for image need to save in uploads folder
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
        // when ever we upload
        // our file will be created in uploads folder with filename format of timestamp and extension with originalfilename
    }
})

//Middleware upload creation
const upload = multer({storage:storage})

//post request
// we use post method to set the data on the server and on the server our data we be processed and after that we get the response 
// if we want to upload and file we need to use post method 
// /add is enddpoint address 

//upload.single("image") this is filedname of image
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood )
foodRouter.post("/remove", removeFood )

//pending to modify
// foodRouter.post("/stockFood", stockFood);




export default foodRouter;
