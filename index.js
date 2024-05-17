const express = require('express');
const app = express();
const port = 3500;
const fs = require("fs");

app.use(express.json());

// middleware to read file
function readFile(req, res, next)
{
    req.data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    next();
}

//middleware to write file
function writeFile(req, res, next)
{
    fs.writeFileSync("./db.json", JSON.stringify(req.data));
    next();
}

//middleware to find student index
function findIndexStudent( req, res, next){
    const student = req.data["students"].find((student) => student.id === parseInt(req.params.id));
    if(student)
        {
            req.studentIndex = req.data["students"].indexOf(student);
        }
    else
    {
        req.status(404).json({"message":"Not found"});
    }
    next();
}

//middleware to find admin index
function findIndexAdmin( req, res, next){
    const admin = req.data["admins"].find((admin) => admin.id === parseInt(req.params.id));
    if(admin)
        {
            req.adminIndex = req.data["admins"].indexOf(admin);
        }
    else
    {
        req.status(404).json({"message":"Not found"});
    }
    next();
}

app.get("/students", readFile, (req, res) =>{
    res.status(200).json(req.data["students"]);
});

app.get("/admins", readFile, (req, res) =>{
    res.status(200).json(req.data["admins"]);
});

app.post("/students", readFile, (req, res, next) =>{
    console.log(req.body.id);
    const {body} = req;
    req.data["students"].push(body);
    next();
}, writeFile, (req, res) =>{
    console.log("Successfully inserted");
    res.end();
})

app.post("/admins", readFile, (req, res, next) =>{
    const {body} = req;
    req.data["admins"].push(body);
    next();
}, writeFile, (req, res) =>{
    res.end();
});

app.put("/students/:id", readFile, findIndexStudent, (req, res, next) =>{
    const {body} = req;
    console.log(body);
    req.data["students"][req.studentIndex] = {id:parseInt(req.params.id),...body};
    next();
}, writeFile, (req, res) =>{
    res.end();
})

app.put("/admins/:id", readFile, findIndexAdmin, (req, res, next) =>{
    const {body} = req;
    req.data["admins"][req.adminIndex] = { id:parseInt(req.params.id), ...body};
    next();
}, writeFile, (req, res) =>{
    res.end();
})

app.patch("/students/:id", readFile, findIndexStudent, (req, res, next) =>{
    const {body} = req;
    req.data["students"][req.studentIndex] = { ...req.data["students"][req.studentIndex], ...body};
    next();
},writeFile, (req, res) =>{
    res.end();
})

app.patch("/admins/:id", readFile, findIndexAdmin, (req, res, next) =>{
    const {body} = req;
    req.data["admins"][req.adminIndex] = { ...req.data["admins"][req.adminIndex], ...body};
    next();
},writeFile, (req, res) =>{
    res.end();
});

app.delete("/students/:id", readFile,findIndexStudent, (req, res, next) =>{
    console.log()
    req.data["students"].splice(res.studentIndex,1);
    next();
}, writeFile, (req, res) =>{
    res.end();
});

app.delete("/admins/:id", readFile,findIndexAdmin, (req, res, next) =>{
    console.log()
    req.data["admins"].splice(res.adminIndex,1);
    next();
}, writeFile, (req, res) =>{
    res.end();
})

app.listen(port, () =>{
    console.log(`listening to server at port : ${port}`);
})