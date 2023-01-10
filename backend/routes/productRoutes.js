const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getPrductReviews,
  deleteReview,
  getAdminAllProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = require("express").Router();

router.route("/products").get(getAllProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminAllProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getPrductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
