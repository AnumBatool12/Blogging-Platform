const {
    rateBlogPost,
    commentOnPost,
}=require("../Controllers/feedhandling")

const express=require("express")

const feedRouter=express.Router()

feedRouter.put("/:blogid/:rate", rateBlogPost)
feedRouter.post("/comment/:blogid", commentOnPost)

module.exports=feedRouter
