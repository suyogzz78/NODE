// const http = require("http");
// const fs = require("fs");
// const server = http.createServer((req, res) => {
//   console.log(req.headers);
//   const log = `${Date.now()}: ${req.url} New req made \n `;

//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (req.url) {
//       case "/":
//         res.end("Welcome to the homepage");
//         break;
//       case "/contact":
//         res.end("contact-page");
//         break;
//       case "/about":
//         res.end("aboutpage");
//         break;
//       default:
//         res.end("404-page not found");
        
//     }
//   });
// });

// server.listen(8000, () => {
//   console.log("hello from the server");
// });


const express = require('express');

const app = express();

app.get('/',(req,res)=>{
  return res.end('hello from express');
})

app.get('/about',(req,res)=>{
 return  res.end(`hello ${req.query.name} from about page`);
})

app.listen(8000,()=>{
  console.log('server started on port 8000');
})

// so here express is built on top of nodejs http module and it makes our work easier by providing us with many inbuilt functions and middlewares to handle requests and responses