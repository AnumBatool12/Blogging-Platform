const mongoose=require("mongoose")

const blogRate=mongoose.Schema({
    "blogID":String, 
    "username":String, 
    "rate":String//username of reciever
})

const model=mongoose.model("blogRate", blogRate)

module.exports=model