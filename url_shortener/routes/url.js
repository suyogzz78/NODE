const express = require('express');
const router = express.Router();
const {handlecreateShortUrl} = require('../controllers/url');

router.post('/',handlecreateShortUrl);
router.get('/:shortId',async (req,res)=>{   
    const shortId = req.params.shortId;
    const url = await URL.findOne({
        shortId
    });
});


module.exports =router;


