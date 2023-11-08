const mongoose=require("mongoose")

const BlogPost=mongoose.Schema({
    "blogID":String, 
    "userID":String, 
    "username":String, 
    "postContent":String, 
    "keywords":[String],
    "blogStatus":String
}, {timestamps:true})

const model=mongoose.model("BlogPost", BlogPost)

module.exports=model