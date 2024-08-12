const User = require("../Schema/user.model");
const { genrateJwtToken, encryptPassword,getDecodedToken }=require("../config/security.config");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
const crypto = require('crypto');
const emailSend=require('../config/email.config')



dotenv.config();

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { email } = getDecodedToken();
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        res.status(500).json({ error: "Internal server error " });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (isMatch) {
        const newHashedPassword = await encryptPassword(newPassword);
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ error: "Password updated sucessfully" });

    } else {
        res.status(400).json({ error: "wrong  current password " })
    }
}

const registerUser = async (req, res) => {
    const user = req.body;
    const hash = await encryptPassword(user.password);
    console.log(hash)
    user.password = hash;
    const savedUser = await User.create(user);
    const { password, ...responseUser } = user
    const token = await genrateJwtToken(user);
    user.token = token;
    res.status(200).json(responseUser);
}


const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const [user] = await User.find({ email });
        const result = await bcrypt.compare(password, user?.password);
        if (result) {
            const token = await genrateJwtToken({ email });
            res.status(200).json(token);
        } else {
            res.status(400).json({ error: "user id and password is wrong" });
        }
    } catch (err) {
        res.status(500).json(err)
    }

}

 const genratePasswordResetToken= async(req,res)=>{
    const {email}=req.body;
    const [user]=await User.find({email});
    if(!user){
        res.status(401).json({
            message:"user email not valid"
        })
    }
    const str=crypto.randomBytes(32).toString('hex');
    await emailSend({from:"jainnaresh1998@gmail.com",to:email,subject:"request for password reset",text:str});
    res.status(200).send({
        message:"email is send"
    })



}
module.exports = { updatePassword, registerUser, login,genratePasswordResetToken }