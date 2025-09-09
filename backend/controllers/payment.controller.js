
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
      console.log("Order created:", order);
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

