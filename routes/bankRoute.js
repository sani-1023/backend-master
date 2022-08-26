const express = require("express");
const router = express.Router();

const { createBankAccount,transaction } = require("../controllers/bankController")

router.route("/createbankaccount").post(createBankAccount);
router.route("/transaction").post(transaction);



module.exports = router
