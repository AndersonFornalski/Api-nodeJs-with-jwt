const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({    
     name:{ type:String, required: true},
     password:{ type: String, required: true, select: false},
     email:{ type: String, unique: true, required: true, lowercase: true },
     createdAt:{ type:Date, default: Date.now}
},{versionKey:false}); 

//encriptografando password
userSchema.pre("save", async function(next){
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;

     next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;


