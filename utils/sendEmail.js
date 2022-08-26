const nodeMailer = require('nodemailer')

const sendEmail = async(options)=>{
    
    const transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        service:'gmail',
        auth:{

            user:'ecommarceweb@gmail.com',
            pass:'ecommarce12345678',
        },
    })

    const mailOptions = {
        from :'ecommarceweb@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail