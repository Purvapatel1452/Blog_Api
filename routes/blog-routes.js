const express=require('express')

const {
       getAllBlogs,
       createBlog,
       updateBlog,
       getBlog,
       deleteBlog,
       getUserBlog
      }=require('../controllers/blog-controller')



const blogRouter=express.Router()

blogRouter.get('/',getAllBlogs)

blogRouter.post('/create',createBlog)

blogRouter.put('/updateBlog/:id',updateBlog)

blogRouter.get('/:id',getBlog)

blogRouter.delete('/delete/:id',deleteBlog)

blogRouter.get('/user/:id',getUserBlog)

module.exports=blogRouter

