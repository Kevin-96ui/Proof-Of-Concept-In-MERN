const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userType: {
            type: String,
            enum: ['Admin', 'User'], // Restrict to 'admin' or 'user'
            required: true,
          },
        username:{
            type:"String",
            required:true,
        },
        email:{
            type:"String",
            required:true,
            unique:true,
        },
        password:{
            type:"String",
            required:true,
            unique:true,
        },
    },
    {
        timestamps:true,
    }
)

const user = mongoose.model("user",userSchema);
module.exports=user;