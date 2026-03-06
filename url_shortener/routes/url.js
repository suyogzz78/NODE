const express = require('express');
const router = express.Router();
const {handlecreateShortUrl,handlegetShortUrl,handlegetAnalytics} = require('../controllers/url');

router.post('/',handlecreateShortUrl);
router.get('/:shortId',handlegetShortUrl);
router.get('/analytics/:shortId',handlegetAnalytics);



module.exports =router;


