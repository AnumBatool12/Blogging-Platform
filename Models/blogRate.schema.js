const mongoose=require("mongoose")

const blogRate=mongoose.Schema({
    "userRater":String, //username of person rating
    "userCreator":String,   //username of creator of post
    "BlogPostID":String,  
    "rate":String//username of reciever
})

const model=mongoose.model("blogRate", blogRate)

module.exports=model