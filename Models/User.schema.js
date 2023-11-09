const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    "username": String, 
    "email": String, 
    "password": String,
    "Role":String, 
    "AccountStatus":String, 
}, {timestamps:true})

const model=mongoose.model("User", UserSchema)

module.exports=model