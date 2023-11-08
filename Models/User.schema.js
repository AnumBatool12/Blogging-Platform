const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    "userID":String,
    "username": String, 
    "email": String, 
    "password": String,
    "Role":String, 
    "AccountStatus":String, 
}, {timestamps:true})

const model=mongoose.model("User", UserSchema)

module.exports=model