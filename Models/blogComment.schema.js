const mongoose=require("mongoose")

const blogComment=mongoose.Schema({
    //"blogID":String, 
    "usernameCommenter":String, 
    "usernameBlogPost":String,
    "comment":String
}, {timestamps:true})

const model=mongoose.model("blogComment", blogComment)

module.exports=model
