const BlogPost=require("../Models/BlogPost.schema")
const blogComment=require("../Models/blogComment.schema")
const blogRate=require("../Models/blogRate.schema")
const notification=require("../Models/notification.schema")

//create blog post 
let createBlogPost=(req, res)=>{
    let blog=req.body
    try{
        BlogPost.create(blog).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"New Blog Post has been successfully created",
                "blogdata":blog
            })
        }).catch(err=>{
            res.status(400).json({
                "Success":false,
                "message":"Failed to create Blog Post",
                "error":err
            })
        })

    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Error in creating New Blog Post",
            "error":err
        })
    }
}

//getting own blog posts
//Comments are only returned when user clicks on blog
let getOwnPosts= async(req, res)=>{
    let profileInfo=req.token

    if (profileInfo){
        try{
            let email=profileInfo.email
            let username=profileInfo.username

            let posts=await BlogPost.find( { username:username})

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

//getting the one blog post along with comments
let getBlogPost=async(req, res)=>{
    let blogid=req.params.blogid
    let profileInfo=req.token

    try{
        let blog= await BlogPost.find({
            _id:blogid,
            username:profileInfo.username
        })

        let comments=await blogComment.find({
            _id:blogid,
            userCreator:profileInfo.username
        })

        if (blog){
            res.status(200).json({
                "Success":true,
                "message":"Blog Found",
                "blogdata":blog,
                "comments":comments
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

//update blog post
let updateBlogPost=async(req, res)=>{
    let userInfo=req.token
    let update=req.body
    let blogid=req.params.blogid

    try{
        if (update.username==userInfo.username){
            let updatedPost=await BlogPost.findOneAndUpdate(
                {_id:blogid},
                { $set: {
                    BlogTitle:update.BlogTitle,
                    postContent:update.postContent,
                    keywords:update.keywords,
                    catagory:update.catagory
                }},
                { returnDocument: 'after' }
            )

            if (updatedPost){
                res.status(200).json({ 
                    "Success":true,
                    "message":"Blog Post updated successfully",
                    "updatedPost":updatedPost
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Could not Update Blog Post",
                })
            }
        }
        else{
            res.status(404).json({
                "Success":false,
                "message":"You are not authorized to update this post",
            })
        }

    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error in Updating Blog Post",
            "error":err
        })
    }
}

//delete blog post
let deleteBlogPost=async(req, res)=>{
    let blogid=req.params.blogid
    let userInfo=req.token

    if (userInfo){
        try{
            let delComments=await blogComment.deleteMany({_id:blogid})
            let delRates=await blogRate.deleteMany({_id:blogid})

            let deletedPost=await BlogPost.findOneAndDelete({
                _id:blogid,
                username:userInfo.username
            })

            if (deletedPost){
                res.status(200).json({
                    "Success":true,
                    "message":"Blog Post deleted successfully"
                })
                
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"Unable to Delete Blog Post",
                })
            }
        }catch(err){
            res.status(400).json({
                "Success":false,
                "message":"Run Time Error in Deleting Blog Post",
                "error":err
            })
        }
    }
    else{
        res.status(404).json({
            "Success":false,
            "message":"You are not authorized to delete post",
        })
    }
}









//rate blog posts
let rateBlogPost=async(req, res)=>{
    let rate=req.body

    try{
        blogRate.create(rate).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"Blog has been successfully rated",
            })
        }).catch(err=>{
            res.status(400).json({
                "Success":false,
                "message":"Blog Post rating error",
                "error":err
            })
        })
    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Error in Rating Blog Post",
            "error":err
        })
    }
}

//comment under blog post
//this is where notification handling is also done
let comment=async(req, res)=>{
    let comment=req.body

    let data=req.body.blogID

    let found=await BlogPost.find({_id:data})
    if (!found){
        res.status(404).json({
            "Success":false,
            "message":"Blog Post Not Found",
        })
    }

    //creating notification
    let newNotification={
        "toUser":found.username,
        "blogID":comment.BlogPostID,
        "notification":"${comment.usernameCommenter} just commented under your post"
    }

    await notification.create(newNotification)

    //commenting under post
    try{
        blogComment.create(comment).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"Blog has been successfully commented",
                "data":comment,
                "notificationStatus":true,
                "notification":newNotification
            })
        }).catch(err=>{
            res.status(400).json({
                "Success":false,
                "message":"Blog Post commenting error",
                "error":err
            })
        })
    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Error in Commenting Blog Post",
            "error":err
        })
    }

}

//filter blog posts

//find a blog post using keywords

//sort blog posts by time

//sort and filter blog posts

//disable blog post

module.exports={
    createBlogPost,
    getBlogPost, 
    getOwnPosts,
    deleteBlogPost, 
    updateBlogPost,
    rateBlogPost,
    comment
}