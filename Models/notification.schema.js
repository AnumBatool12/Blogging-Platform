const mongoose=require("mongoose")

const notification=mongoose.Schema({
    "toUser":String,
    "blogID":String,//add user name of reciever
    "notification":String, 
}, {timestamps:true})

const model=mongoose.model("notification", notification)

module.exports=model