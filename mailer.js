const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendResetEmail = (email, token) => {
    const mailOptions ={
        from:'your-email@gmail.com',
        to:email,
        subject:'password reset',
        text:'you requested a password reset.  please click on he following links to reset your password: http://localhost:5000/reset-password?token=${token'
    };

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.error('error sending email:',error);
        }
        else{
            console.log('Email sent:',info.response);
        }
    });
};

module.exports = sendResetEmail;