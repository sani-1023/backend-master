const transactionModel = require("../models/transactionModel");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.userOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const userOrder = await transactionModel.find({userId: userId}).sort({"createdAt": -1});

    if(!userOrder)
    {
        return next(new ErrorHandler("No order available",400));
    }

    res.status(200).json({
        success: true,
        userOrder
    })

});



exports.adminOrderDetails = catchAsyncErrors(async (req, res, next) => {
    
    const adminOrder = await transactionModel.find().sort({"createdAt": -1});

    if(!adminOrder)
    {
        return next(new ErrorHandler("No order available",400));
    }

    res.status(200).json({
        success: true,
        adminOrder
    })

});


exports.supplierOrderDetails = catchAsyncErrors(async (req, res, next) => {
    
    const supplierOrder = await transactionModel.find().sort({"createdAt": -1});

    if(!supplierOrder)
    {
        return next(new ErrorHandler("No order available",400));
    }

    res.status(200).json({
        success: true,
        supplierOrder
    })

});



