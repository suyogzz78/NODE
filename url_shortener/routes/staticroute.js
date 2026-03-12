const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const shortid = require('shortid');

router.get('/',async (req,res)=>{
    // const shortID = shortid();
    // await URL.create({
    //     shortId:shortID,
    //     redirectUrl:'https://www.google.com',
    //     viewHistory:[]
    // });
    const allUrls = await URL.find({});
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