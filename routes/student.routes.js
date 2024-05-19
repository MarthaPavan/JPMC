const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const studentModel = require("../model/student.model");
const {getStudents, insertStudents, updateStudents, deleteStudents} = require("../controllers/student.controllers");


routes.use(express.json());

const x = mongoose.connect("mongodb://127.0.0.1:27017/testJP");
x.then(() =>{
    console.log("Connection with database is Successful.");
})

routes.get("/", getStudents);

routes.post("/", insertStudents);

routes.patch("/:_id", updateStudents);

routes.delete("/:_id", deleteStudents);

routes.put("/:_id", async (req, res) =>{
    try
    {
        const {body} = req;
        const oldstudent = await studentModel.findById(parseInt(req.params._id));
        const {_id} = oldstudent;
        const student = await studentModel.findByIdAndUpdate(_id,{_id,...body});
        res.status(200).json(student);
    }
    catch(err)
    {
        res.status(200).json({message:"Not Updated"});
    }
});

module.exports = routes;