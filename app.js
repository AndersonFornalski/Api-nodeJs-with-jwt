const express = require("express");
const  bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("./controller/userController");
const projectController = require("./controller/projectController");
const cors =require("cors");

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));



app.use(cors());
mongoose.connect("mongodb+srv://drogabel:drogabel@drogabel-kj10u.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology:true,},
console.log("MongoDb Conectado"))

app.use("/auth", userController);
app.use("/projects", projectController );
//app.use("/products", productController);



const PORT= process.env.PORT || 5000;
app.listen(PORT, function(){
   console.log("App rodando na porta 5000");
});







