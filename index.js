const http = require('http');
const fs = require('fs');

// Load index.html once when the server starts to improve performance
const index = fs.readFileSync('index.html', 'utf-8');
// Load data.json once when the server starts
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// Assuming you want to use the first product in some way
const product = data.product;


const morgan = require('morgan')
const express = require('express');
const { type } = require('os');
const server = express()

server.use(morgan('default'));

// server.use((req,res,next)=>
// {
//    console.log(new Date(),req.hostname ,req.method, req.ip ,req.get('user-agent'))
//    next()
// })

const auth = ((req , res , next)=>
{
    console.log(req.query)
    if(req.query.password=='123')
    {
          next()
    }
    else
    {
      res.sendStatus(401)
    }
})

server.use(express.static('public'));
server.use(express.json());
// server.use(auth);
server.get('/', auth,(req,res) => {
   
    res.json({type:'GET1'})
})
server.get('/',(req,res)=>{
    res.json({type:'GET2'})
})
server.put('/',(req,res)=>{
    res.json({type:'PUT'})
})
server.post('/',(req,res)=>{
    res.json({type:'POST'})
})
server.delete('/',(req,res)=>{
    res.json({type:'DELETE'})
})
server.patch('/',(req,res)=>{
    res.json({type:'PATCH'})
})

// server.get('/',(req,res)=>{
//     //   res.send("hi from aastha")
//       res.json(product)
// })


server.listen(3030,()=>{
    console.log("server started")
})