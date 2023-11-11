const mongoose=require("mongoose")

const BlogPost=mongoose.Schema({
    "username":String, 
    "BlogTitle":String,
    "postContent":String, 
    "AvgRating":String,
    "keywords":[String],
    "catagory":[String],
    "blogStatus":String //Public or Disabled
}, {timestamps:true})

const model=mongoose.model("BlogPost", BlogPost)

module.exports=model