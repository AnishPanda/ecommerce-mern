const catchAsyncError = require("../middleware/cachAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const processPayment = catchAsyncError(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const option = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(option);
  res.status(200).json({
    success: true,
    order,
  });
});

const razorpayApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

const verifyPayment = catchAsyncError(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = { processPayment, razorpayApiKey, verifyPayment };
