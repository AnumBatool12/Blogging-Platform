const {
    createBlogPost,
    getBlogPost,
    getOwnPosts,
    deleteBlogPost,
    updateBlogPost,
    getNotification,
    getFollowingList
}=require("../Controllers/bloghandling")
const {authUserProfile}=require("../utils")
const express=require("express")

let blogRouter=express.Router()
//This route is for the creator of posts only

blogRouter.post("/createBlog", createBlogPost)//
blogRouter.get("/", authUserProfile, getOwnPosts)//
blogRouter.get("/notification", authUserProfile, getNotification)
blogRouter.get("/followers", authUserProfile,getFollowingList)
blogRouter.get("/:blogid", authUserProfile, getBlogPost)
blogRouter.patch("/:blogid", authUserProfile, updateBlogPost)//
blogRouter.delete("/:blogid", authUserProfile ,deleteBlogPost)//



module.exports=blogRouter