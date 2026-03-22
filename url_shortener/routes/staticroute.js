const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const shortid = require('shortid');
const {restriction} = require('../middlewares/auth');

router.get('/admin/urls',restriction(['ADMIN']),async (req,res)=>{
   
   
    const allUrls = await URL.find({});//updated to fetch only the URLs created by the logged-in user
    return  res.render('homepage',{
        // id:shortID,
        urls:allUrls
    });
})

router.get('/',restriction(['NORMAL','ADMIN']),async (req,res)=>{
    // const shortID = shortid();
    // await URL.create({
    //     shortId:shortID,
    //     redirectUrl:'https://www.google.com',
    //     viewHistory:[]
    // });
   
    const allUrls = await URL.find({createdBy:req.user._id});//updated to fetch only the URLs created by the logged-in user
    return  res.render('homepage',{
        // id:shortID,
        urls:allUrls
    });
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports = router;