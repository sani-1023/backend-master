const mongoose = require("mongoose")


const transactionModelSchema = new mongoose.Schema({


    bankAccount:{
        type:String,
        required:[true,"Please Enter bankAccount"]
    },
    userId:{
        type:String,
        required:true,
    },

    totalAmount:{
        type:Number,
        required:[true,"Please Enter a totalamount"]
    },
    transactionId:{
        type:String,
        default:"123",
        required:[false,"Need transactionId"],
    },
    order:[
        {
            productId:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            productName:{
                type:String,
                required:true
            },
        }
    ],  
    status:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("transactionModel",transactionModelSchema);