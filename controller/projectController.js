const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Project = require("../models/project");
const Task = require("../models/task");

const routes = express.Router();

routes.use(authMiddleware);




 routes.post("/save", function(req, res){
     console.log(req.body);
     let proj  = new Project({
          title: req.body.title,
          description: req.body.description,     
     });
     proj.save((err, proj)=>{
         if(err)
             res.status(500).send(err);
         else
         res.status(200).send(proj);
     })
 })


routes.get("/", async (req, res)=>{
     try {
          const projects = await Project.find();

          return res.send({ projects });

     } catch (error) {
          res.status(400).send({ error:"Error Loading Project...!" });
     }
})



routes.get("/:projectId", async (req, res)=>{
     try {
          const projects = await Project.findById({projectId});

          return res.send({ projects });

     } catch (error) {
          res.status(400).send({ error:"Error Loading Project Id...!" });
     }
     
     
})

routes.put("/:projectId", async (req, res)=>{
     res.send({user: req.userId});
})

routes.delete("/:projectId", async (req, res)=>{
     res.send({user: req.userId});
})

module.exports = routes;
