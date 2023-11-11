const {createUser, Login, getUsers}=require("../Controllers/loginhandling")
const express=require("express")

let routerLogin=express.Router()

routerLogin.post("/newUser", createUser)//
routerLogin.post("/", Login)//
routerLogin.get("/", getUsers)//remove this later

module.exports=routerLogin