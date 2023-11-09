const {
    createBlogPost,
    getBlogPost,
    deleteBlogPost,
    updateBlogPost
}=require("../Controllers/bloghandling")
const {authUserProfile, authAdminProfile}=require("../utils")

const express=require("express")
let blogRouter=express.Router()

blogRouter.post("/createBlog", createBlogPost)//
blogRouter.post("/getblog", getBlogPost)//
blogRouter.delete("/", authUserProfile ,deleteBlogPost)//
blogRouter.patch("/", authUserProfile,updateBlogPost)//



module.exports=blogRouter