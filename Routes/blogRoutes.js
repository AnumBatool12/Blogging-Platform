const {
    createBlogPost,
    getBlogPost,
    deleteBlogPost,
    updateBlogPost,
    rateBlogPost
}=require("../Controllers/bloghandling")
const {authUserProfile, authAdminProfile}=require("../utils")

const express=require("express")
let blogRouter=express.Router()

blogRouter.post("/createBlog", createBlogPost)//
blogRouter.post("/getblog", getBlogPost)//
blogRouter.delete("/", authUserProfile ,deleteBlogPost)//
blogRouter.patch("/", authUserProfile,updateBlogPost)//
blogRouter.post("/rate", rateBlogPost)//




module.exports=blogRouter