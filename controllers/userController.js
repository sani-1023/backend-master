const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')



//Register a user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,phone,bankAccount} = req.body 
    
    const user = await User.create({
        name,email,password,phone,bankAccount,
        avatar:{
            public_id:"This is a sample id",
            url:"This is profile pic url"
        }
    })
    

    sendToken(user,201,res)
})


//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body
    
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password to login",400))
    }

    const user = await User.findOne({email:email}).select("+password")
    console.log("login")
    console.log(user)
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched = await user.ComparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))

    }

    sendToken(user,200,res)
  
})


//Log out User

exports.logOut = catchAsyncErrors(async(req,res,next)=>{

   res.cookie("token",null,{
       expires:new Date(Date.now()),
       httpOnly:true,

   })

   res.status(200).json({
       success:true,
       message:"Logged out successfully",
   })


})

//Forgot password


// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
  
//     if (!user) {
//       return next(new ErrorHandler("User not found", 404));
//     }
  
//     // Get ResetPassword Token
//     const resetToken = user.getPasswordResetToken();
  
//     await user.save({ validateBeforeSave: false });
  
//     const resetPasswordUrl = `${req.protocol}://${req.get(
//       "host"
//     )}/password/reset/${resetToken}`;
  
//     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
//     try {
//       await sendEmail({
//         email: user.email,
//         subject: `Ecommerce Password Recovery`,
//         message,
//       });
  
//       res.status(200).json({
//         success: true,
//         message: `Email sent to ${user.email} successfully`,
//       });
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
  
//       await user.save({ validateBeforeSave: false });
  
//       return next(new ErrorHandler(error.message, 500));
//     }
//   });



//   //Not working properly.
//Reset Password
// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//     // creating token hash
//     //const token = req.params.token;
//     //console.log(token)
//     const resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");
  
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });
  
//     if (!user) {
//       return next(
//         new ErrorHandler(
//           "Reset Password Token is invalid or has been expired",
//           400
//         )
//       );
//     }
  
//     if (req.body.password !== req.body.confirmPassword) {
//       return next(new ErrorHandler("Password does not Match", 400));
//     }
  
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
  
//     await user.save();

//   //  await user.save((err, result) => {
//   //       if (err) {
//   //           return res.status(400).json({
//   //               error: 'Error resetting user password',
//   //           });
//   //       }
//   //       res.json({
//   //           message: `Great! Now you can login with your new password`,
//   //       });
//   //   });


  
//     sendToken(user, 200, res);
//   });



// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  
  console.log(user)
  res.status(200).json({
    success: true,
    user,
  });
});


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {


  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.ComparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});
  