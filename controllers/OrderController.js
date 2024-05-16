import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // by this we have support of stripe in this component

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      delivery: req.body.delivery,
      discount: req.body.discount,
    });

    await newOrder.save(); // it will save the order in our database
    // after placing the order we should cler the user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // to create stripe payment link were we insert all product data nad currency and unit amount and quantity
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.new_price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: req.body.delivery * 100,
      },
      quantity: 1,
    });
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Discount",
        },
        unit_amount: (req.body.discount * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({userId:req.body.userId}) // userId will come form middleware
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// Listing order for admin panel
const listOrders = async (req, res) => {
  // create logic to get all details of user details
  try {
    const orders = await orderModel.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
    
  }
}


// Api for updateing the order status

const updateStatus = async (req, res) => {
  try {
    // first we will find the order by using the Id and then we update the value 
    // we will get order id and status by req.body and we will send that while calling the api
     
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status}) // our staus will be upadted in our databse
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
    
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
