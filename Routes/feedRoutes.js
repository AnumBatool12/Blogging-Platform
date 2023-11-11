const {
    rateBlogPost,
    commentOnPost,
    getUsersProfile,
    getBloggersPosts,
    followBlogger
}=require("../Controllers/feedhandling")
const {authUserProfile}=require("../utils")

const express=require("express")

const feedRouter=express.Router()

feedRouter.put("/:blogid/:rate", rateBlogPost)
feedRouter.post("/comment/:blogid", commentOnPost)
feedRouter.get("/:username", getUsersProfile)
feedRouter.get("/UserBlogs/:username", getBloggersPosts)
feedRouter.get("/follow/:followid", authUserProfile, followBlogger)

module.exports=feedRouter
