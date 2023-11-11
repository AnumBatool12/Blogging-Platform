const Users=require("../Models/User.schema")
const BlogPost=require("../Models/BlogPost.schema")

//view all users
let getAllUsers=async(req, res)=>{
    let token=req.token

    if (token){
        try{
            let userData= await Users.find({})
            userData=userData.filter(u=>u.Role=="User")
            if(userData){
                res.status(200).json({
                    "Success":true,
                    "message":"Users Found",
                    "Users":userData
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message": "Error in get All users route"
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message": "Run Time Error in Getting User",
                "error":err
            })
        }
    }
    else{
        res.status(404).json({
            "Success":false,
            "message": "You are not authorized"
        })
    }
    
}

//block a user
let updateUserStatus=async(req, res)=>{
    let auth=req.headers.token

    if (auth){
        try{
            let {username, AccountStatus}=req.body
            let blockedUser=await Users.findOneAndUpdate(
                {username:username},
                { $set: {AccountStatus:AccountStatus}},
                { returnDocument: 'after' }
            )

            if (blockedUser){
                res.status(200).json({
                    "Success":true,
                    "message":"User's account status updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update User's account status",
                })
            }

        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Blocking User",
                "error":err
            })
        }
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to block User"
        })
    }
}

//list all blog posts
//block a blog

//see a particular blog post

module.exports={
    getAllUsers,
    updateUserStatus
}