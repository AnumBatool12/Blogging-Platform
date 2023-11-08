const mongoose=require("mongoose")

const blogRate=mongoose.Schema({
    "blogID":String, 
    "userID":String, 
    "rate":String
})

const model=mongoose.model("blogRate", blogRate)

module.exports=model