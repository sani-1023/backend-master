const express = require("express");
const router = express.Router();

const { createBankAccount,usertransaction,admintransaction,suppliertransaction } = require("../controllers/bankController")

router.route("/createbankaccount").post(createBankAccount);
router.route("/usertransaction").post(usertransaction);
router.route("/admintransaction").post(admintransaction);
router.route("/suppliertransaction").post(suppliertransaction);



module.exports = router
