const studentModel = require("../model/student.model");


async function getStudents(req, res) 
{
    const student =await studentModel.find({});
    res.status(200).json(student);
}


async function insertStudents(req, res)
{
    try
    {
        const {_id,name,email,phone} = req.body;
        const students =await studentModel.create({
            _id:_id,
            name:name,
            email:email,
            phone:phone
        });
        res.status(200).json(students);
    }
    catch(err)
    {
        res.status(404).json({message:"Not inserted into database"});
    }
}

async function updateStudents( req, res )
{
    try
    {
        const {body} = req;
        const oldstudent = await studentModel.findById(parseInt(req.params._id));
        const {_id,name,email,phone} = oldstudent;
        const student = await studentModel.findByIdAndUpdate(_id, {_id,name,email,phone,...body});
        res.status(200).json(student);
    }
    catch(err)
    {
        res.status(404).json({message:"Not Updated"});
    }
}

async function deleteStudents(req, res)
{
    try
    {
        const {_id} = req.params;
        const student = await studentModel.findByIdAndDelete(_id);
        res.status(200).json(student);
    }
    catch( err)
    {
        res.status(200).json({message:"Not deleted"});
    }
}


module.exports = {getStudents, insertStudents, updateStudents, deleteStudents};