const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({    
     title:{ type:String, required: true},
     assignedTo:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
     project:{ type: mongoose.Schema.Types.ObjectId, ref:"Project", required: true },
     completed:{ type: Boolean, required: true, default: false},

     createdAt:{ type:Date, default: Date.now}
},{versionKey:false}); 


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;


