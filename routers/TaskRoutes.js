const express=require("express");
const routes=express.Router();
const Task=require("../Schema/task.model")

routes.get("/",async (req,res)=>{
  const tasks= await Task.find({taskName:"Mathmatecs"});
  console.log(tasks);
  res.json(tasks)
})


// creating a task 
routes.post("/",async (req,res)=>{
    const task= req.body;
    const savedTask=await Task.create(task);
    res.status(200).json({
        message:"Added succesfully",
        task:savedTask
    })
})



routes.put("/update/:id",async (req,res)=>{
  const {id}=req.params;
  const {status}=req.body;
  try{

    const task= await Task.findById(id);
    task.status=status;
    const savedTask=await task.save();
    res.status(200).json(savedTask);
  }catch(err){
    console.log(err);
    res.status(500).send("server error")
  }
})





module.exports=routes;