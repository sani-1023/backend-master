const Bank = require("../models/bankModels");
const errorHandler = require("../utils/errorHandler");

exports.createBankAccount = async (req, res, next) => {
  const bank = await Bank.create(req.body);

  res.status(200).json({
    success: true,
    bank,
  });
};

exports.transaction = async (req, res, next) => {
  const { bankAccount, totalAmount, secretKey } = req.body;

  const ecommerceAccount = 12345;

  const bankInfo = await Bank.findOne({ accountNumber: bankAccount });
  const bankInfoEcommerce = await Bank.findOne({
    accountNumber: ecommerceAccount,
  });

  if (bankInfo && bankInfo.secretKey === secretKey) {
    bankInfo.inAmount = bankInfo.inAmount - totalAmount;
    bankInfo.outAmount = bankInfo.outAmount + totalAmount;

    await bankInfo.save();

    bankInfoEcommerce.inAmount = bankInfoEcommerce.inAmount + totalAmount;

    await bankInfoEcommerce.save();




    // bankInfoEcommerce.outAmount = bankInfoEcommerce.outAmount + totalAmount;
  }

  res.status(200).json({
    success: true,
    bankInfo,
    bankInfoEcommerce,
  });
};
