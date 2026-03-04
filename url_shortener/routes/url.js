const express = require('express');
const router = express.Router();
const {handlecreateShortUrl} = require('../controllers/url');

router.post('/',handlecreateShortUrl);


module.exports =router;


