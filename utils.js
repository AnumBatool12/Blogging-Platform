const jwt=require("jsonwebtoken")
const BlogPost=require("./Models/BlogPost.schema")

//This is for user
const authUserProfile=(req, res, next)=>{
    //getting token from headers
    const token=req.headers.token
    if (!token){
        res.status(401).json({"message":"Token not found"})
    }

    //decoding the token and storing in req
    try{
        let decodedToken=jwt.verify(token, process.env.SECRET_USER)
        req.token=decodedToken
        next()

    }catch(err){
        res.status(401).json({
            "Success":false,
            "message":"Error getting Token",
            "error":err
        })
    }
}

//This is for admin
const authAdminProfile=(req, res, next)=>{
    //getting token from headers
    const token=req.headers.token
    if (!token){
        res.status(401).json({"message":"Token not found"})
    }

    //decoding the token and storing in req
    try{
        let decodedToken=jwt.verify(token, process.env.SECRET_ADMIN)
        req.token=decodedToken
        next()

    }catch(err){
        res.status(401).json({
            "Success":false,
            "message":"Error getting Token",
            "error":err
        })
    }
}

module.exports={
    authUserProfile,
    authAdminProfile,
}