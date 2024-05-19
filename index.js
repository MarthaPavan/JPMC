const express = require("express");
const app = express();
const cors = require("cors"); 
app.use(cors());
const studentRoutes = require("./routes/student.routes");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/students/", studentRoutes);
app.listen(3000);