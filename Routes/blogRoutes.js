const {
    createBlogPost,
    getBlogPost,
    getOwnPosts,
    deleteBlogPost,
    updateBlogPost,
    rateBlogPost,
    comment
}=require("../Controllers/bloghandling")
const {authUserProfile}=require("../utils")
const express=require("express")

let blogRouter=express.Router()
//This route is for the creator of posts only

blogRouter.post("/createBlog", createBlogPost)//
blogRouter.get("/", authUserProfile, getOwnPosts)//
blogRouter.get("/:blogid", authUserProfile, getBlogPost)
blogRouter.patch("/:blogid", authUserProfile, updateBlogPost)//
blogRouter.delete("/:blogid", authUserProfile ,deleteBlogPost)//

blogRouter.post("/rate",rateBlogPost)//
blogRouter.post("/comment", comment)//

module.exports=blogRouter