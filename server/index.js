const express = require("express");
const app=express();
const mongoose=require('mongoose');
const userRouter=require("./routes/user.routes.js");
const cors=require('cors');

app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods:["GET", "POST", "PUT", "DELETE"]
    }
))
app.use("/user",userRouter);


mongoose
.connect ("mongodb://localhost:27017/Task")
.then(()=>{
    console.log("DB connected");
    app.listen(5000,()=>{
        console.log('Server started on port 5000');
    });
})
.catch((err)=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    console.log("Node is running");
    res.send("5000 port")
})