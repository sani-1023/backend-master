const express = require("express");

const router = express.Router();


const { userOrderDetails,adminOrderDetails,supplierOrderDetails } = require("../controllers/orderDetailsController");



router.route("/userorder").post(userOrderDetails);
router.route("/adminorder").get(adminOrderDetails);
router.route("/supplierorder").get(supplierOrderDetails);


module.exports = router