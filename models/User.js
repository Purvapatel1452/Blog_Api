const mongoose=require('mongoose')
const validator=require('validator')

const Schema=mongoose.Schema;

const userSchema=new Schema({

    name:{
        type:String,
        required:true

    },
    
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:validator.isEmail

    },
    
    password:{
        type:String,
        required:true,
        minlength:8

    },

    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }]
    
})

module.exports=new mongoose.model("User",userSchema)