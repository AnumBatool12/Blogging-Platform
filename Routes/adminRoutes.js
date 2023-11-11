const {
    getAllUsers, updateUserStatus, seeAllBlogPosts,
    getBlogPost, handleBlogStatus
}=require("../Controllers/adminhandling")
const {authAdminProfile}=require("../utils")

const express=require("express")
let adminRouter=express.Router()

adminRouter.get("/users", authAdminProfile, getAllUsers)
adminRouter.patch("/block", authAdminProfile, updateUserStatus)
adminRouter.get("/blogs", authAdminProfile, seeAllBlogPosts)
adminRouter.get("/blogs/:blogid", getBlogPost)
adminRouter.patch("/blogs/:blogid", authAdminProfile, handleBlogStatus)

module.exports=adminRouter
