const express =require('express')
const mongoose=require('mongoose')
const router = require('./routes/user-routes')
const blogRouter = require('./routes/blog-routes')

const PORT=5000

const app=express()

app.use(express.json())

app.use('/api/user',router)

app.use('/api/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}...`)
})

mongoose.connect("mongodb+srv://purvaptl1452:Purva1452@cluster0.c5xml7q.mongodb.net/?retryWrites=true&w=majority") //mongodb+srv://purvaptl1452:Purva1452@cluster0.c5xml7q.mongodb.net/?retryWrites=true&w=majority
.then(()=>{console.log('Connected to MongoDB...')})
.catch((err)=>{
    console.log(err)
})