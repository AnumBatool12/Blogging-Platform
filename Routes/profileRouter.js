const {getUserProfile,
    deleteAccount,
    updatePassword,
    updateEmail,
    updateUsername,
    updateUserDesc}=require("../Controllers/profilehandling")

const {authUserProfile, authAdminProfile}=require("../utils")
const express=require("express")

let profileRouter=express.Router()

//user profile handling
profileRouter.get("/user", authUserProfile, getUserProfile)//
profileRouter.delete("/user", authUserProfile, deleteAccount)//
profileRouter.patch("/user/password", authUserProfile, updatePassword)//
profileRouter.patch("/user/email", authUserProfile, updateEmail)//
profileRouter.patch("/user/username", authUserProfile, updateUsername)//
profileRouter.patch("/user/description", authUserProfile, updateUserDesc)//

//admin profile handling
profileRouter.get("/admin", authAdminProfile, getUserProfile)//
profileRouter.patch("/admin/password", authAdminProfile, updatePassword)//
profileRouter.patch("/admin/email", authAdminProfile, updateEmail)//
profileRouter.patch("/admin/username", authAdminProfile, updateUsername)//
profileRouter.patch("/admin/description", authAdminProfile, updateUserDesc)//

module.exports=profileRouter