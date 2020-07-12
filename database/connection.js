
const mongoose = require('mongoose');
const URI = "mongodb+srv://dbUser:dbUser@andersonfornalski-nyyf3.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async(req, res)=>{
    await mongoose.connect(URI, { useNewUrlParser: true,  useUnifiedTopology: true  } );
    console.log("banco de dados conectado ...!!");
};

module.exports = connectDB;