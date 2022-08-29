const mongoose = require("mongoose");



const imgSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
  });

module.exports = ImageModel = mongoose.model("Image", imgSchema);