const {
    getAllUsers, updateUserStatus
}=require("../Controllers/adminhandling")
const {authAdminProfile}=require("../utils")

const express=require("express")
let adminRouter=express.Router()

adminRouter.get("/users", authAdminProfile, getAllUsers)
adminRouter.patch("/block", authAdminProfile, updateUserStatus)

module.exports=adminRouter
