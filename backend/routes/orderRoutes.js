const express = require("express");
const router = express.Router();
const {isVerifiedUser} = require("../middleware/tokenVerification");
const { addOrder, getAllOrders, getOrder, updateOrder} = require("../controllers/orderController");

//Order Routes
router.route("/").post(isVerifiedUser, addOrder);
router.route("/").get(isVerifiedUser, getAllOrders);
router.route("/:id").get(isVerifiedUser, getOrder);
router.route("/:id").put(isVerifiedUser, updateOrder);

module.exports = router;