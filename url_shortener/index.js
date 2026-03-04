const express = require('express');
const PORT = 8000;
const app = express();
const urlroute = require('./routes/url');
const {connecttodatabase} = require('./connection');
//middleware
app.use(express.json());
connecttodatabase('mongodb://localhost:27017/url_shortener').then(()=>{
    console.log('Connected to database');
})

app.use("/url",urlroute);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});