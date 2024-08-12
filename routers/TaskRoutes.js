const express=require("express");
const routes=express.Router();
const Task=require("../Schema/task.model")

routes.get("/",async (req,res)=>{
  const tasks= await Task.find();
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
  console.log(id);
  const {status}=req.body
  try{

    const task= await Task.findById(id);
    console.log(task)
    task.status=status;
    const savedTask=await task.save();
    res.status(200).json(savedTask);
  }catch(err){
    console.log(err);
    res.status(500).send("server error")
  }
})


// delete task
routes.delete("/delete/:id",async(req, res)=>{
  const {id} = req.params;
  
    const task = await Task.findIdAndDelete(id);
    if(task){
  res.status(200).json({message: "Task Deleted Successfully"});
    }
  else{
    res.status(404).json({message: "Task not found"});
  }

})




module.exports=routes;