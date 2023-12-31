const {
    rateBlogPost,
    commentOnPost,
    getUsersProfile,
    getBloggersPosts,
    followBlogger,
    findBlogs, 
    mainFeed,
    mainFeed1
}=require("../Controllers/feedhandling")
const {authUserProfile}=require("../utils")

const express=require("express")

const feedRouter=express.Router()

//feedRouter.put("/:blogid/:rate", rateBlogPost)
//feedRouter.post("/comment/:blogid", commentOnPost)
//feedRouter.get("/:username", getUsersProfile)
//feedRouter.get("/UserBlogs/:username", getBloggersPosts)
//feedRouter.get("/follow/:followusername", authUserProfile, followBlogger)
//feedRouter.get("/mainfeed1", authUserProfile, mainFeed1)
feedRouter.get("/mainfeed", authUserProfile ,mainFeed)
feedRouter.get("/:author/:title/:catagory/:keyword", findBlogs)


module.exports=feedRouter
