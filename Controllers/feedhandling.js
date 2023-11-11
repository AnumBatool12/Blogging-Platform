const BlogPost=require("../Models/BlogPost.schema")
const blogComment=require("../Models/blogComment.schema")
const blogRate=require("../Models/blogRate.schema")
const notification=require("../Models/notification.schema")
const User=require("../Models/User.schema")
const followings=require("../Models/following.schema")

const mongoosePaginate = require('mongoose-paginate');


//rate a blog post
let rateBlogPost=async(req, res)=>{
    let blogid=req.params.blogid
    let rate=req.params.rate
    let rater=req.body.username

    try{
        //getting average rate of blog post
        let blog=await BlogPost.findOne({_id:blogid})
        let currAvgRate=blog.AvgRating

        //getting total people who have rated
        const currentRating=await blogRate.countDocuments({BlogPostID:blogid})

        //calculting new average rate
        let newAvgRate=((currAvgRate*currentRating)+rate)/(currentRating+1)

        //updating blog post average
        let updatedAverge=await BlogPost.findOneAndUpdate(
            {_id:blogid},
            { $set :{AvgRating:newAvgRate}},
            { returnDocument: 'after' }
        )

        if (updatedAverge){
            //creating Rating log
            let newRate={
                "userRater":rater,
                "userCreator":blog.username,
                "BlogPostID":blogid,
                "rate":rate
            }

            //adding to blog rate db
            blogRate.create(newRate).then(()=>{
                res.status(201).json({
                    "Success":true,
                    "message":"Blog has been Rated",
                })
            }).catch(err=>{
                res.status(400).json({
                    "Success":false,
                    "message":"Failed to Add Rate to DB"
                })
            })

            
        }else{
            res.status(400).json({
                "Success":false,
                "message":"Failed to Update Average Rating",
            })
        }


    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error in Rating Post",
            "error":err
        })
    }
}

//comment on a blog send notification 
let commentOnPost=async(req, res)=>{
    let comment=req.body.comment
    let commenter=req.body.username
    let blogid=req.params.blogid

    let found=await BlogPost.findOne({_id:blogid})
    if (!found){
        res.status(404).json({
            "Success":false,
            "message":"Blog Post Not Found",
        })
    }

    let not=commenter + 'just commented under your post';
    //creating notification
    let newNotification={
        "userReciever":found.username,
        "userSender":commenter,
        "ID":blogid,
        "notification":not
    }

    //adding to notification db
    const notify=await notification.create(newNotification)
    if (!notify){
        res.status(404).json({
            "Success":false,
            "message":"Could not Notify",
        })
    }

    //adding comment to Blog comments
    let newComment={
        "userCommenter":commenter,
        "userCreator":found.username,
        "BlogPostID":blogid,
        "comment":comment
    }

    try{
        blogComment.create(newComment).then(()=>{
            res.status(201).json({
                "Success":true,
                "message":"Blog has been successfully commented",
                "data":comment,
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
            "message":"Run Time Error in Commenting Blog Post",
            "error":err
        })
    }

}

//get another bloggers profile (name and desc)
let getUsersProfile=async(req, res)=>{
    let getUser=req.params.username

    try{
        let UserInfo=await User.findOne({username:getUser})

        if (UserInfo){
            res.status(200).json({
                "Success":true,
                "message":"User Found",
                "username":UserInfo.username,
                "userDesc":UserInfo.userDesc,
            })
        }
        else{
            res.status(400).json({
                "Success":false,
                "message":"User Not Found",
            })
        }

    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error in Getting Profile",
            "error":err
        })
    }
}

//get another bloggers posts
let getBloggersPosts=async(req, res)=>{
    let getUser=req.params.username

    
    try{
        let blogPost=await BlogPost.find({username:getUser})

        if (blogPost){
            res.status(200).json({
                "Success":true,
                "message":"Blogs Found",
                "blogs":blogPost
            })
        }
        else{
            res.status(400).json({
                "Success":false,
                "message":"Blogs Not Found",
            })
        }

    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error in Getting Blogs",
            "error":err
        })
    }

}

//follow a blogger -->send notification
let followBlogger=async(req, res)=>{
    let profileusername=req.token.username //follower
    let follow=req.params.followusername  //followed

    let findUser=await User.findOne({username:follow}) //seeing if blogger exists
    if (!findUser){
        res.status(404).json({
            "Success":false,
            "message":"User Does Not exisit",
        })
    }

    let newFollower={
        "blogger":follow,
        "follower":profileusername
    }
    let not=profileusername + " is now following your blog"
    let notify={
        "userReciever":follow,
        "userSender":profileusername,
        "ID":follow,
        "notification":not
    }

    try{
        //sending notification
        let Notify=await notification.create(notify)
        if (!Notify){
            res.status(404).json({
                "Success":false,
                "message":"Could not Notify",
            })
        }

        let nowfollowing=await followings.create(newFollower)
        if (nowfollowing){
            res.status(201).json({
                "Success":true,
                "message":"Following Status Updated",
            })
        }
        else{
            res.status(400).json({
                "Success":false,
                "message":"Unable to Follow",
            })
        }


    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error during Following",
            "error":err
        })
    }
}

//This is used for filteration as well
//finding blog posts by title, author, or catagory
let findBlogs=async(req, res)=>{
    let author = req.params.author;
    let title = req.params.title;
    let catagories = req.params.catagory.split(',');; // Assuming categories are comma-separated
    let keyword=req.params.keyword.split(',');;

    try{
        let blogs=await BlogPost.find({
            $or: [
                { username: author },
                { BlogTitle: title },
                { catagory: { $in: catagories } },
                { keywords: { $in: keyword }}
            ]
        })

        if (blogs){
            res.status(200).json({
                "Success":true,
                "message":"Here are some Blogs",
                "Blogs":blogs
            })
        }
        else{
            res.status(400).json({
                "Success":false,
                "message":"Blogs Not Found",
            })
        }
    }catch(err){
        res.status(400).json({
            "Success":false,
            "message":"Run Time Error During Finding Blog Posts",
            "error":err
        })
    }
}

//getting blogs on general feed(pagination and mixing with followers posts)
let mainFeed=async(req, res)=>{
    let userid=req.params.author
    let titles=req.params.title
    let getusername=req.token.username//no pressure to get this 

    try{
        let getFollowingList=await followings.find({follower:getusername})//getting list of followers
        let getFollowerUsername=getFollowingList.map(user=>user.blogger)

        const query={
            $or:[
                {username: {$in: [...getFollowerUsername, userid]}},
                {BlogTitle:titles}
            ]
        }
        
        const option={
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.pageSize) || 10
        }

        try{
            let posts=await BlogPost.paginate(query, option);
            
            if (posts.docs){
                res.status(200).json({
                    "Success":true,
                    "message":"Here are your posts",
                    "blogs": posts.docs
                })
            }
            else{
                res.status(404).json({
                    "Success":false,
                    "message":"No posts to be displayed",
                })
            }
        }catch(err){
            res.status(404).json({
                "Success":false,
                "message":"Error in Getting Blog Posts",
                "error":err
            })
        }
    }catch(err){
        res.status(404).json({
            "Success":false,
            "message":"Error in displaying main feed",
            "error":err
        })
    }
}



module.exports={
    rateBlogPost,
    commentOnPost,
    getUsersProfile,
    getBloggersPosts,
    followBlogger,
    findBlogs,
    mainFeed
}