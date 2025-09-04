// const razorpay = require('razorpay')
// const dotenv = 
// require('dotenv').config()

// exports.createRazorpayInstance = () =>{
//   return new razorpay({
//   key_id : process.env.RAZORPAY_KEY_ID,
//   key_secret : process.env.RAZORPAY_KEY_SECRET
// })
// }

const Razorpay = require("razorpay");

exports.createRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
