const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const sendResetEmail = require('../config/mailer');
const bcrypt = require('bcruptjs');
const user = require('../models/user');

router.post('/request-password-reset', async(req,res)=>{
    const{email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(404).json({msg:'user not found'});

        const resetToken = generateToken();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        sendResetEmail(email, resetToken);

        res.json({msg: 'password reset email sent'});
    }
    catch(err){
        res.status(500).send('server error');
    }
});

router.post('/reset-password', async (req,res) => {
    const {token, newPassword} = req.body;
    try{
        const user = await User.findOne({resetToken:token, resetTokenExpiry:{$gt:Date.now() } });
        if(!user)
            return res.status(400).json({msg: 'Invalid or expired token'});

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({msg: 'password has been reset'})
    }
    catch(err){
        res.status(500).send('server error');
    }
});

module.exports = router;
