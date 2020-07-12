const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({    
     title:{ type:String, required: true},
     description:{ type: String, required: true},
     user:{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
     tasks:[{ type: mongoose.Schema.Types.ObjectId, ref:"Task", required: true }],   

     createdAt:{ type:Date, default: Date.now}
},{versionKey:false}); 


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;