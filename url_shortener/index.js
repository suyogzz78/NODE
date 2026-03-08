const express = require('express');
const PORT = 8000;
const app = express();
const path = require('path');
const urlroute = require('./routes/url');
const URL = require('./models/url');
const {connecttodatabase} = require('./connection');
//middleware
app.use(express.json());
connecttodatabase('mongodb://localhost:27017/url_shortener').then(()=>{
    console.log('Connected to database');
})

 app.set('view engine','ejs');//using ejs as template engine for rendering html pages
 app.set('views',path.resolve("./views"));//setting the views directory for ejs templates
 app.use("/url",urlroute);
app.get('/test',async(req,res)=>
{
    const allUrls = await URL.find({});
   return res.render('homepage',{urls:allUrls});
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});