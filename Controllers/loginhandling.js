const users=require("../Models/User.schema")
const jwt=require("jsonwebtoken")

//create user
let createUser=async(req, res)=>{
    let newUser=req.body
    try{ 
        users.create(newUser).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"New User has been successfully created",
            })
        }).catch(err=>{
            res.status(400).json({
                "Success":false,
                "message":"New user could not be created"
            })
        })
    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Error in creating new User",
            "error":err
        })
    }
}

//login user
let Login=async(req, res)=>{
    let {username, email, password}=req.body

    try{
        let user=await users.findOne({email:email})

        if (user && user.AccountStatus=="Active"){
            if (user.username==username){
                if (user.password==password){
                    let {password, ...rest}=user
                    role=user.Role
                    var token
                    
                    try{
                        if (role=="Admin"){
                            token=jwt.sign({email:email, username:username, role:user.Role}, 
                            process.env.SECRET_ADMIN)
                            
                        }
                        else if (role=="User"){
                            token=jwt.sign({email:email, username:username, role:user.Role}, 
                            process.env.SECRET_USER)
                        }

                        res.status(200).json({
                            rest, 
                            Success: true, 
                            message:"User found", 
                            token:token,
                        })
                    }catch(err){
                        console.log("Error in creating token")
                        console.log(err)
                        res.status(404).json({
                            "Success":false,
                            "error":err
                        })
                    }
                }
                else{
                    res.status(404).json({
                        "Success":false,
                        "message":"Incorrect Password"
                    })
                }
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Incorrect Username"
                })
            }
        }
        else if(user && user.AccountStatus=="Disabled"){
            res.status(403).json({
                "Success":false,
                "message":"Your Account has Been Disabled"
            })
        }
        else{
            res.status(404).json({
                "Success":false,
                "message":"User Doesnot Exists"
            })
        }

    }catch(err){
        res.status(404).json({
            "Success":false,
            "message":"Error Logging in User"
        })
    }

}

let getUsers=async(req, res)=>{
    let user= await users.find({})
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({"message": "Error in get All users route"})
    }
}

module.exports={
    createUser,
    Login,
    getUsers,
}