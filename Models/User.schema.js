const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    "username": String, 
    "email": String, 
    "password": String,
    "userDesc":String,
    "Role":String, 
    "AccountStatus":String, //Active or Disabled
}, {timestamps:true})

const model=mongoose.model("User", UserSchema)

module.exports=model