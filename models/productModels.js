const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({


    name:{
        type:String,
        required:[true,"Please Enter a Product name"]
    },

    description:{
        type:String,
        required:[true,"Please Enter a Product description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter a Product price"],
        maxLength:[8,"Price cannot have more than 8 digits"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter a Product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product stock"],
        maxLength:[8,"Price cannot have more than 8 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product",productSchema);