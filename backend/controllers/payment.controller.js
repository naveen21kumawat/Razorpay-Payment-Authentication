// const express = require("express");
// const { createRazorpayInstance } = require("../config/razorpay.config");
// const crypto = require('crypto')
// require('dotenv').config();
// const razorpayInstance = createRazorpayInstance();

// exports.createOrder = async (req,res) => {
//   const { courseId, amount } = req.body;
//    if(!courseId || !amount){
//     return res.status(400).json(
//       {
//         success : false,
//         message : " Course id and amonut is required"
//       }
//     )
//    }
//   //course data fetch fron course id
//   const options = {
//     amount: amount * 100,
//     currency: "INR",
//     receipt: "receipt_order_1",
//   };

//   try {
//     razorpayInstance.orders.create(options, (err, order) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: "Something went wrong",
//         });
//       }
//       return res.status(200).json(order);
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// exports.verifyPayment= async ( req ,res ) =>{
//   const { order_id , payment_id ,signature}  = req.body;
//   const secret = process.env.RAZORPAY_KEY_SECRET;

//   //create hmac  object
//   const hmac = crypto.createHmac("sha256", secret)
//   hmac.update( order_id + "|" + payment_id);

//   const generatedSignature = hmac.digest("hex")

//   if( generatedSignature === signature){
//     return res.status(200).json({
//       success : true,
//       message : "Payment Verified"
//     });
    
//   }else{
//       return res.status(200).json({
//       success : false,
//       message : "Payment Not Verified"
//   })


// }

// }
// controllers/paymentController.js
const crypto = require("crypto");
const { createRazorpayInstance } = require("../config/razorpay.config");
require("dotenv").config();

const razorpayInstance = createRazorpayInstance();

exports.createOrder = async (req, res) => {
  const { courseId, amount } = req.body;

  console.log("Incoming Request:", req.body);

  if (!courseId || !amount) {
    return res.status(400).json({
      success: false,
      message: "courseId and amount are required",
    });
  }

  const options = {
    amount: amount * 100, // convert to paisa
    currency: "INR",
    receipt: `receipt_${courseId}_${Date.now()}`,
  };

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Order creation error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to create Razorpay order",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    console.error("Catch block error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${order_id}|${payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Payment Not Verified",
    });
  }
};

