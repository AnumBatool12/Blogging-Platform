const mongoose=require("mongoose")

const following=mongoose.Schema({
    "blogger":String,//the person being followed
    "follower":String//the person who followed
})

const model=mongoose.model("following", following)

module.exports=model