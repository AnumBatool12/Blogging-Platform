const mongoose=require("mongoose")

const notification=mongoose.Schema({
    "userReciever":String,//reciver of notification
    "userSender":String,    //user commenter /follower
    "ID":String,//id of blog post or user who was followed ->so we know who to send it to
    "notification":String, 
}, {timestamps:true})

const model=mongoose.model("notification", notification)

module.exports=model