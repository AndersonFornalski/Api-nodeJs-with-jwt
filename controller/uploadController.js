const express = require("express");
const routes = express.Router();
const multer = require("multer");
var upload = multer({ dest: 'uploads/' })


routes.get("/",(req, res)=> res.render('home'));


routes.post("/profile", upload.single('avatar'), function(req, res){
   console.log(req.body, req.files)
})


module.exports = routes;
