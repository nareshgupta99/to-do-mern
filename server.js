const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors = require('cors');






dotenv.config();
const app=express();

const PORT= process.env.PORT || 8082

const CORSORIGIN=process.env.CORS;




const corsOptions = {
    origin: CORSORIGIN, // Replace with your client domain
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };

  
  
  
  
  
  app.use(express.json())  // getting the data from client
  
app.use(cors(corsOptions));
app.use("/api/v1/task",require("./routers/TaskRoutes"));
app.use("/api/v1/user",require("./routers/UserRoutes"));

// app.use("/api/v1/user",require(""));

mongoose.connect("mongodb://localhost:27017/to-do").then(()=>{
    console.log("db is connected")
}).catch((err)=>{
    console.log(err)
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})






