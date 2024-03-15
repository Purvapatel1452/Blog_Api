const User=require('../models/User')
const bcrypt=require('bcryptjs')

const getAllUsers=async(req,res,next)=>{
    let users;
    try{
        users=await User.find()

    }
    catch(err){
        return console.log(err)
    }

    if(!users){
        return res.status(404).json({message:'User Not Found'})
    }

    return res.status(200).json({users})
}

const signup=async(req,res,next)=>{
    let {name,email,password}=req.body;
    let existingUser;

    try{

      
        existingUser=await User.findOne({email})

    }
    catch(err){
        return console.log(err)
    }

    if(existingUser){
        return res.status(404).send({message:"User already Exists! Use another Email"})
    }

    const hashedPassword=bcrypt.hashSync(password)


    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    })
    
    try{
        await user.save();

    }
    catch(err){

        return console.log(err)
    }

    return res.status(201).send({user})
}

const login=async(req,res,next)=>{
    let {email,password}=req.body

    let existingUser;

    try{
        existingUser=await User.findOne({email})
    }
    catch(err){
        console.log(err)
    }

    if(!existingUser){
        return res
              .status(404)
              .send({message:'user email not found'})
    }

    let isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)

    if(!isPasswordCorrect){

        return res
               .status(400)
               .send({message:'user password is not correct'})

    }
    return res.status(200).json({mesaage:"Login Successfull !!!"})
}


module.exports= {
    getAllUsers,
    signup,
    login,
};