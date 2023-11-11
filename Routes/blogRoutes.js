const {
    createBlogPost,
    getBlogPost,
    getOwnPosts,
    deleteBlogPost,
    updateBlogPost,
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

blogRouter.post("/comment", comment)//

module.exports=blogRouter