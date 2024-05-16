import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import "dotenv/config.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());

// using this we can access any package from frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://digital-mru-frontend.vercel.app",
    ],
  })
);

// DB Connection
connectDB();

app.get("/", (req, res) => {
  res.send("API Working"); // what ever we write here we can see in this end point
}); // get method is http method can used to request the data from server
// we also have delete, update, post ...... method more

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); //uploads folder will be mounted in this endpoint('/images')

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

// To Run the express server
app.listen(port, () => {
  console.log(`Server Started On https://localhost:${port}`); // back ticks are called template literals
});
