const express = require("express");
const routes = express.Router();
const Task = require("../Schema/task.model");
const User=require("../Schema/user.model");
const { isAuthenticated, verifyToken, getDecodedToken } = require("../config/security.config");

routes.get("/",isAuthenticated, async (req, res) => {
  const {email}=getDecodedToken();
  const user=await User.findOne({email});
  const tasks = await Task.find({createdBy:user._id});
  res.json(tasks)
})


// creating a task 
routes.post("/", isAuthenticated, async (req, res) => {
  const task = req.body;
  const {email}=getDecodedToken();
  const savedTask = await Task.create(task);
  const user=await User.findOne({email});
  savedTask.createdBy=user;
  await savedTask.save();
  res.status(200).json({
    message: "Added succesfully",
    task: savedTask
  })
})



routes.put("/update/:id",isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { description,taskName,priority } = req.body
  try {
    const task = await Task.findById(id);
    task.description=description;
    task.taskName=taskName;
    task.priority=priority;
    const savedTask = await task.save();
    res.status(200).json({message:"task details updated"});

  } catch (err) {
    console.log(err);
    res.status(500).send("server error")
  }
})


// delete task
routes.delete("/delete/:id",isAuthenticated, async (req, res) => {
  const { id } = req.params;
  // const task = await Task.findByIdAndDelete(id);
  const {email}=getDecodedToken();
  const user=await User.findOne({email});
  const task = await Task.findOneAndDelete({ _id: id, createdBy: user._id });
  if (task) {
    res.status(200).json({ message: "Task Deleted Successfully", task });
  }
  else {
    res.status(404).json({ message: "Task not found" });
  }

})


routes.put("/update/status/:id",isAuthenticated, async (req,res)=>{

  const { id } = req.params;
  const { status } = req.body
  try {

    const task = await Task.findById(id);
    task.status = status;
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error")
  }
})

routes.get("/:id",isAuthenticated,async(req,res)=>{

  try {
    const { id } = req.params;
    const {email}=getDecodedToken();
    const user=await User.findOne({email});
    // Use `await` to get the task from the database
    const task = await Task.findOne({ _id: id,createdBy:user._id });
    
    // Handle the case where the task is not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ message: 'Server error' });
  }
})




module.exports = routes;