const mongoose=require("mongoose")

const blogComment=mongoose.Schema({
    "blogID":String, 
    "userID":String, 
    "comment":String
}, {timestamps:true})

const model=mongoose.model("blogComment", blogComment)

module.exports=model
