const BlogPost=require("../Models/BlogPost.schema")
const blogComment=require("../Models/blogComment.schema")
const blogRate=require("../Models/blogRate.schema")
const notification=require("../Models/notification.schema")

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


//get another bloggers posts

//follow a blogger -->send notification

//sorting blogs

//filtering blogs

//finding blog posts by title, author, or catagory

//getting blogs on general feed(pagination and mixing with followers posts)
//This one owns the / route


module.exports={
    rateBlogPost,
    commentOnPost,
}