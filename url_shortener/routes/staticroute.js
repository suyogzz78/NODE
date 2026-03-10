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


module.exports = router;