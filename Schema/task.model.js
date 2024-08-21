const mongoose=require("mongoose");

const TaskSchema=mongoose.Schema({
    taskName:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
    },
    priority:{
        type:Number,
        required: true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    }


})

const Task=mongoose.model("Task",TaskSchema);

module.exports=Task;