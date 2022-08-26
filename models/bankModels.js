const mongoose = require("mongoose")


const bankSchema = new mongoose.Schema({


    name:{
        type:String,
        required:[true,"Please Enter a Product name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter a email"]
    },
    phone:{
        type:String,
        required:[true,"Please Enter a phone number"]
    },

    inAmount:{
        type:Number,
        required:[false,"Need a bankin amount "],
        default:1000000
    },
    
    outAmount:{
        type:Number,
        required:[false,"Need a bankout amount "],
        default:0
    },
    secretKey:{
        type:String,
        required:[true,"Provide a secret key"]
    }, 
    createdAt:{
        type:Date,
        default:Date.now
    },
    accountNumber:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("Bank",bankSchema);



