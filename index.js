//npm packages
const mongoose=require("mongoose")
const express=require("express")
require("dotenv").config()

//routers
const routerLogin=require("./Routes/loginRoute")
const profileRouter=require("./Routes/profileRouter")
const blogHandler=require("./Routes/blogRoutes")
const FeedHandler=require("./Routes/feedRoutes")
const adminHandler=require("./Routes/adminRoutes")

//app
const app=express()
app.use(express.json())

app.listen(3000, ()=>{
    console.log("App listening in on port 3000")
})

//routing
app.use("/login", routerLogin)
app.use("/profile", profileRouter)
app.use("/blog", blogHandler)
app.use("/feed", FeedHandler)
app.use("/admin", adminHandler)

//Database
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log("Error in Connecting to Database")
})

