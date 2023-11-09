const mongoose=require("mongoose")

const blogComment=mongoose.Schema({
    "blogID":String, 
    "username":String, 
    "comment":String
}, {timestamps:true})

const model=mongoose.model("blogComment", blogComment)

module.exports=model
