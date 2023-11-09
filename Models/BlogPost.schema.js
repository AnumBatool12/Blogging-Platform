const mongoose=require("mongoose")

const BlogPost=mongoose.Schema({
    //"blogID":String, 
    "username":String, 
    "postContent":String, 
    "keywords":[String],
    "blogStatus":String //Active or Disable
}, {timestamps:true})

const model=mongoose.model("BlogPost", BlogPost)

module.exports=model