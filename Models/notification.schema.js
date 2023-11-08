const mongoose=require("mongoose")

const notification=mongoose.Schema({
    "toUser":String,
    "notification":String, 
}, {timestamps:true})

const model=mongoose.model("notification", notification)

module.exports=model