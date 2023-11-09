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

//read a/one blog post
let getBlogPost=async(req, res)=>{
    let {_id, username}=req.body
    
    try{
        let blog= await BlogPost.find({
            _id: _id,
            username:username
        })

        if (blog){
            res.status(200).json({
                "Success":true,
                "message":"Blog Found",
                "blogdata":blog
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
            "message":"Error In Getting Blog Post"
        })
    }
}

//update blog post
let updateBlogPost=async(req, res)=>{
    let userInfo=req.token
    let {_id, username, postContent, keywords}=req.body

    try{
        if (username==userInfo.username){
            let updatedPost=await BlogPost.findOneAndUpdate(
                {_id:_id},
                { $set: {postContent:postContent, keywords:keywords}},
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
            "message":"Error in Updating Blog Post",
            "error":err
        })
    }
}

//delete blog post
let deleteBlogPost=async(req, res)=>{
    let userInfo=req.token
    let blogid=req.body._id
    let user=req.body.username
    try{
        let username=userInfo.username

        if (username==user){
            let delComments=await blogComment.deleteMany({_id:blogid})
            let delRates=await blogRate.deleteMany({_id:blogid})

            let deletedPost=await BlogPost.findOneAndDelete({
                _id:blogid,
                username:username
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
        }
        else{
            res.status(404).json({
                "Success":false,
                "message":"You are not authorized to delete post",
            })
        }
    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Error in Deleting Blog Post",
            "error":err
        })
    }
}

//get all blog posts (pagination)

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

    try{
        blogComment.create(comment).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"Blog has been successfully commented",
                "data":comment
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
    deleteBlogPost, 
    updateBlogPost,
    rateBlogPost,
    comment
}