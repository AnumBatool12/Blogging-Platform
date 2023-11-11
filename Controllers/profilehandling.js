const users=require("../Models/User.schema")

//get your own profile details (not blogs or password)
let getUserProfile=(req, res)=>{
    let profileInfo=req.token

    if (profileInfo){
        res.status(200).json({
            "Success":true, 
            "message":"Profile Recieved",
            data:{
                "email":profileInfo.email,
                "username":profileInfo.username
            }
        })
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized",
        })
    }
}

//delete own account
let deleteAccount=async(req, res)=>{
    let profileInfo=req.token

    if (profileInfo){
        let email=profileInfo.email
        try{
            let deletedAccount=users.findOneAndDelete({email:email})
            if (deletedAccount){
                res.status(200).json({
                    "Success":true,
                    "message":"Account deleted successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Unable to delete Account",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in deleting User",
                "error":err
            })
        }
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to delete account"
        })
    }
}

//update password
let updatePassword=async(req, res)=>{
    let profileInfo=req.token
    
    if (profileInfo){
        try{
            let newPassword=req.body.password
            let updatedUser=await users.findOneAndUpdate(
                {email:profileInfo.email}, 
                { $set: {password:newPassword}},
                { returnDocument: 'after' }
            )

            if (updatedUser){
                res.status(200).json({
                    "Success":true,
                    "message":"Password updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update Password",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Updating Password",
                "error":err
            })
        }        
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to update Password"
        })
    }
}

//update email
let updateEmail=async(req, res)=>{
    let profileInfo=req.token
    
    if (profileInfo){
        try{
            let newEmail=req.body.email
            let updatedUser=await users.findOneAndUpdate(
                {email:profileInfo.email}, 
                { $set: {email:newEmail}},
                { returnDocument: 'after' }
            )

            if (updatedUser){
                res.status(200).json({
                    "success":true,
                    "message":"Email updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update Email",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Updating Email",
                "error":err
            })
        }        
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to update email"
        })
    }
}

//update username
let updateUsername=async(req, res)=>{
    let profileInfo=req.token
    
    if (profileInfo){
        try{
            let newUsername=req.body.username
            let updatedUser=await users.findOneAndUpdate(
                {email:profileInfo.email}, 
                { $set: {username:newUsername}},
                { returnDocument: 'after' }
            )

            if (updatedUser){
                res.status(200).json({
                    "success":true,
                    "message":"Username updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update Username",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Updating Username",
                "error":err
            })
        }        
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to update username"
        })
    }
}

//update user decription
let updateUserDesc=async(req, res)=>{
    let profileInfo=req.token
    
    if (profileInfo){
        try{
            let newUserDesc=req.body.userDesc;
            let updatedUser=await users.findOneAndUpdate(
                {email:profileInfo.email}, 
                { $set: {userDesc:newUserDesc}},
                { returnDocument: 'after' }
            )

            if (updatedUser){
                res.status(200).json({
                    "success":true,
                    "message":"User Description updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update User Description",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Updating User description",
                "error":err
            })
        }        
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to update user description"
        })
    }
}



//diable account-->move to admin controllers
let disableUserAccount=async(req, res)=>{
    let auth=req.headers.token

    if (auth){
        try{
            let {email, AccountStatus}=req.body
            let blockedUser=await users.findOneAndUpdate(
                {email:email},
                { $set: {AccountStatus:AccountStatus}},
                { returnDocument: 'after' }
            )

            if (blockedUser){
                res.status(200).json({
                    "success":true,
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


module.exports={
    getUserProfile,
    deleteAccount,
    updatePassword,
    updateEmail,
    updateUsername,
    updateUserDesc,
    disableUserAccount
}