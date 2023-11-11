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
let seeAllBlogPosts=async(req, res)=>{
    let profileInfo=req.token

    if (profileInfo){
        try{
            let posts=await BlogPost.find({})

            if (posts){
                res.status(200).json({
                    "Success":true, 
                    "message":"Posts Found",
                    "Posts":posts
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Posts not Found",
                })
            }

        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Run Time Error in getting Blog Posts",
                "error":err
            })
        }
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"Failed to get Token"
        })
    }
}

//see a particular blog post
let getBlogPost=async(req, res)=>{
    let blogid=req.params.blogid

    try{
        let blog= await BlogPost.find({
            _id:blogid,
        })

        if (blog){
            res.status(200).json({
                "Success":true,
                "message":"Blog Found",
                "blogdata":blog,
            })
        }
        else{
            res.status(404).json({
                "Success":false,
                "message":"Blog not Found"
            })
        }


    }catch(err){
        res.status(404).json({
            "Success":false,
            "message":"Error In Getting Blog Post",
            "error":err
        })
    }
}

//block a blog
let handleBlogStatus=async(req, res)=>{
    let auth=req.headers.token
    let blogid=req.params.blogid

    if (auth){
        try{
            let {blogStatus}=req.body
            let blockedUser=await BlogPost.findOneAndUpdate(
                {_id:blogid},
                { $set: {blogStatus:blogStatus}},
                { returnDocument: 'after' }
            )

            if (blogStatus){
                res.status(200).json({
                    "Success":true,
                    "message":"Blog's status updated successfully"
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update blog's status",
                })
            }

        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Blocking Blog",
                "error":err
            })
        }
    }
    else{
        res.status(401).json({
            "Success":false,
            "message":"You are not authorized to block blog"
        })
    }
}


module.exports={
    getAllUsers,
    updateUserStatus,
    seeAllBlogPosts,
    getBlogPost,
    handleBlogStatus
}