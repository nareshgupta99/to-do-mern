const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");

dotenv.config();
const app=express();

const PORT= process.env.PORT || 8082


app.use(express.json())  // getting the data from client

app.use("/api/v1/task",require("./routers/TaskRoutes"));

// app.use("/api/v1/user",require(""));

mongoose.connect("mongodb://localhost:27017/to-do").then(()=>{
    console.log("db is connected")
}).catch((err)=>{
    console.log(err)
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})






