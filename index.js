//npm packages
const mongoose=require("mongoose")
const express=require("express")
require("dotenv").config()

//routers
const routerLogin=require("./Routes/loginRoute")
const profileRouter=require("./Routes/profileRouter")

//app
const app=express()
app.use(express.json())

app.listen(3000, ()=>{
    console.log("App listening in on port 3000")
})

//routing
app.use("/login", routerLogin)
app.use("/profile", profileRouter)

//Database
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log("Error in Connecting to Database")
})

