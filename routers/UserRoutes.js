const express=require("express");
const routes=express.Router();
const User=require("../Schema/user.model");
const bcrypt = require('bcrypt');


// to creating a user


routes.post("/signup",async (req,res)=>{

    const user=req.body;
    const hash= await encryptPassword(user.password);
    console.log(hash)
    user.password=hash;
    User.create(user);
    res.status(200).json(user);

})

// login api

//forgot password


//update password

// to get a user


// function to hash a password

const encryptPassword= async function( password){

    const saltRounds = 10;
    const hash=await bcrypt.hash(password, saltRounds);
    return hash;
}



module.exports=routes;