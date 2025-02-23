const express = require('express')
const mongoose = require('mongoose')
const Blog = require('../models/Blog')

const router = express.Router();

router.post('/blogs', async(req,res)=>{
    try{
        const { title, body, author} = req.body;

        if(!title || !body || !author){
            return res.status(400).json({error:'required'})
        }

        const blog = new Blog({ title, body, author})
        await blog.save()
        res.status(201),json(blog)
    }catch(error){
        res.status(500).json({error:'failed'})
    }
})

router.get('/blogs', async(req,res)=>{
    try{
        const blogs = await Blog.find();
        res.json(blogs)
    }catch(error){
        res.status(500).json({error:'failed'})
    }
})

router.get('/blogs/:id', async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        if(!blog) return res.status(404).json({error:'not found'})
        res.json(blog)
    }catch(error){
        res.status(500).json({error:'failed'})
    }
})

router.put('/blogs/:id', async(req,res)=>{
    try{
        const {title, body, author} = req.body;
        if(!title || !body || !author){
            return res.status(400).json({error:'required'})
        }
        const blog = await Blog.findByIdAndUpdate(req.params.id, {title, body, author}, {new: true, runValidators:true })
        if(!blog) return res.status(404).json({error:'not found'})
        res.json(blog)
    }catch(error){
        res.status(500).json({error:'failed'})
    }
})

router.delete('/blogs/:id', async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id)

        if(!blog) return res.status(404).json({error:'not found'})
        res.json({message:'deleted'})
    }catch(error){
        res.status(500).json({error:'failed'})
    }
})
module.exports = router;


// <!DOCTYPE html>
// <html lang="ru">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Блог</title>
//     <link rel="stylesheet" href="/style.css">
// </head>
// <body>
//     <div class="container">
//         <h1>Blog</h1>
        
//         <h2>List of posts</h2>
//         <div id="posts"></div>
//     </div>

//     <script>
//         const API_URL = 'http://localhost:3000/api/blogs';
        
//         async function fetchPosts() {
//             const response = await fetch(API_URL);
//             const posts = await response.json();
            
//             document.getElementById('posts').innerHTML = '';
//             posts.forEach(post => {
//                 document.getElementById('posts').innerHTML += `
//                     <div class="post" id="post-${post._id}">
//                         <h3>${post.title}</h3>
//                         <p>${post.body}</p>
//                         <small>Автор: ${post.author}</small>
//                     </div>
//                 `;
//             });
//         }

//         fetchPosts();
//     </script>
// </body>
// </html>