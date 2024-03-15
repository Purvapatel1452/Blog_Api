const mongoose=require('mongoose')
const Blog=require('../models/Blog')
const User = require('../models/User')

const getAllBlogs=async(req,res,next)=>{
    let blogs

    try{
        blogs=await Blog.find()
    }
    catch(err){
        return console.log(err)
    }

    if(!blogs){
        return res.status(404).json({message:'Blogs not Found'})
    }

    return res.status(200).send(blogs)
}

const createBlog=async(req,res,next)=>{
    let {title,description,image,user}=req.body

    let existingUser;
    
    try{
        existingUser=await User.findById(user)
    }
    catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({meassage:"User not found !!!"})
    }

    const blog=new Blog({

        title,
        description,
        image,
        user
    });

    try{
        const session=await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
     }
    catch(err){
        return console.log(err)
    }
    return res.status(200).json({blog})
}

const updateBlog=async(req,res,next)=>{
    
    let {title,description}=req.body
    const blogId=req.params.id
    let blog;

    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })

    }
    catch(err){
        return console.log(err)
    }

    if(!blog){
        res.status(500).json({message:"blog not found !!!"})
    }
    return res.status(200).json({blog})
}


const getBlog=async(req,res,next)=>{
   
    let id=req.params.id;
    let blog;

    try{
        blog=await Blog.findById(id)
    }
    catch(err){
        return console.log(err)
    }

    if(!blog){
        return res.status(404).json({message:"Blog not found"})
    }

    return res.status(200).json({blog})
}

const deleteBlog=async(req,res,next)=>{
    let id=req.params.id
    let blog;

    try{
        blog=await Blog.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
     
    }
    catch(err){
      
        console.log(err)
    }

     
    if(!blog){
        return res.status(404).json({message:"blog not found !!!"})
    }

    return res.status(200).json({message:"successfully deleted the following blog:"})
}


const getUserBlog=async(req,res,next)=>{
    let userId=req.params.id;
    let userBlogs
    
    try{
        userBlogs=await User.findById(userId).populate("blogs")
    }
    catch(err){
        res.status(400).json({message:"console"})
        return console.log(err)
    }

    if(!userBlogs){
        return res.status(404).json({message:"user not exist"})
    }

    return res.status(200).json({blogs:userBlogs})
}

module.exports={
    getAllBlogs,
    createBlog,
    updateBlog,
    getBlog,
    deleteBlog,
    getUserBlog,
};

