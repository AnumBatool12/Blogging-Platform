const mongoose=require("mongoose")

const blogComment=mongoose.Schema({
    "userCommenter":String, ///username of person that commented
    "userCreator":String,   //username of creator of post
    "BlogPostID":String,    //id of the blog post
    "comment":String
}, {timestamps:true})

const model=mongoose.model("blogComment", blogComment)

module.exports=model
