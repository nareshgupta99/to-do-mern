const express = require("express");
const routes = express.Router();
const { isAuthenticated } = require("../config/security.config");
const { updatePassword, registerUser, login,genratePasswordResetToken }=require("../controllers/User.Controller");





// to creating a user
routes.post("/signup",registerUser);

// login api
routes.post("/login", login);

//update password
routes.put('/update-password', isAuthenticated,updatePassword);

//forgot password
routes.post("/forgot",genratePasswordResetToken);




module.exports = routes;