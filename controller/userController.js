const express = require("express");
const routes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json")

function generateToken(params ={}){
   return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
  })
}


routes.post("/registrar", function(req, res){
    console.log(req.body);
    let d  = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    d.save((err, dep)=>{
        if(err)
            res.status(500).send(err);
        else
        res.status(200).send(dep);
    })
})


routes.post("/register", async (req, res)=>{
    console.log(req.body);

    const { email } = req.body;

    try {
        if(await User.findOne({email}))
            return res.status(400).send({error:"User alredy exist!"});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id}),});

    } catch (error) {
        return res.status(400).send({error:"Registration failed!"})
    }
})


routes.post("/authenticate", async (req, res)=>{
    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user)
        return res.status(400).send({ error:"User not found" });

        if(!await bcrypt.compare(password, user.password))

        return res.status(400).send({error:"Invalid password"})

        user.password = undefined;      

        
        res.send({ 
            user, 
            token: generateToken({ id: user.id}),
     });
});



routes.get("/", function(req, res){
    User.find().exec((err, deps)=>{
        if(err)
            res.status(500).send(err);
        else
        res.status(200).send(deps);
    })
})

routes.get("/:id", function(req, res){
    User.findById({_id: req.params.id}).exec((err, deps)=>{
        if(err)
            res.status(500).send(err);
        else
        res.status(200).send(deps);
    })
})

routes.delete("/:id", function(req, res){
    User.deleteOne({_id: req.params.id}).exec((err, deps)=>{
        if(err)
            res.status(500).send(err);
        else
        res.status(200).send();
    })
})




module.exports = routes;

