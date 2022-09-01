const express = require("express");
const router = express.Router();

const { createBankAccount,usertransaction,admintransaction,suppliertransaction, bankInfo } = require("../controllers/bankController")

router.route("/createbankaccount").post(createBankAccount);
router.route("/usertransaction").post(usertransaction);
router.route("/admintransaction").post(admintransaction);
router.route("/suppliertransaction").post(suppliertransaction);
router.route("/bankinfo").get(bankInfo);


module.exports = router
