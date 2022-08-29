const express  = require("express")
const cookieParser = require('cookie-parser')
const imageModel = require("../backend/models/imageModel");
const app = express()
const errorMiddleWare = require("./middleware/error")
const cors = require('cors');
const jwt = require('jsonwebtoken')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

const multer = require("multer");
const fs = require("fs");


app.use(express.json())
app.use(cookieParser())
app.use(cors());


// route import
const product = require("./routes/productRoute")
const bank = require("./routes/bankRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")

app.use("/api/v1",product)
app.use("/api/v1",bank)
app.use("/api/v1",user)
app.use("/api/v1",order)


app.use(errorMiddleWare)

///image upload


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async(req, res) => {
  console.log("image inside",req.body.id);
  const saveImage =  imageModel({
    // userId:req.body.id,
    userId :req.body.id,
    img: {
      data: fs.readFileSync("uploads/"+req.file.filename),
      contentType: "image/png",
    },

  });

  
    saveImage
    .save()
    .then((res) => {
      console.log("image is saved"); 
    })
    .catch((err) => {
      console.log(err, "error has occur");
    }); 
  
  
  
    res.send('image is saved')
});

app.post("/getImg",async(req, res) =>{
  //console.log("get image")
  //const {userinfo} = req.body;
  //console.log(req.body.userinfo)
  const allData = await imageModel.findOne({userId:req.body.userinfo}).sort({"createdAt":-1})

  //console.log(allData[0])
  res.json(allData)

})



module.exports = app