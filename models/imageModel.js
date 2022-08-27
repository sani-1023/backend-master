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
  });

module.exports = ImageModel = mongoose.model("Image", imgSchema);