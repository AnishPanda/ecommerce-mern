const router = require("express").Router();
const {
  processPayment,
  razorpayApiKey,
  verifyPayment,
} = require("../controllers/paymentControllers");
// const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(processPayment);

router.route("/razorpaykey").get(razorpayApiKey);

router.route("/verifypayment").post(verifyPayment);

module.exports = router;
