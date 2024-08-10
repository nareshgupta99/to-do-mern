const mongoose=require("mongoose");

const TaskSchema=mongoose.Schema({
    taskName:{
        type:String,
    },
    desription:{
        type:String,
    },
    status:{
        type:String,
    },
    priority:{
        type:Number,
        required: true
    }


})

const Task=mongoose.model("Task",TaskSchema);

module.exports=Task;