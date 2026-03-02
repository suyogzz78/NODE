const express = require("express");
const app = express();
const port = 3000;
const filesystem = require("fs");
const {logrequest} = require("./middlewares/usermid");
//const users = require("./MOCK_DATA.json");
 
const userroutes = require("./routes/user");
const {connectToDatabase} = require("./connections");

//connect to the database


connectToDatabase("mongodb://localhost:27017/suyogdb");
//middleware

app.use(express.urlencoded({ extended: false }));

app.use(logrequest("log.txt"));// this will log all the incoming requests to the server in the log.txt file, we are using a custom middleware for this purpose, we are passing the filename as an argument to the middleware function so that we can log the requests in different files if needed
 // return res.end("response from middleware 1");//res.end() is used to end the response and send it back to the client, if we don't call res.end() or res.send() the request will be stuck in this middleware and will never reach the route handler
 
app.use((req,res,next)=>{

  console.log("hello from the middleware 2");// we can use multiple middlewares in our application and they will be executed in the order they are defined
  next(); // here we are calling the next middleware in the stack, if we don't call next() the request will be stuck in this middleware and will never reach the route handler
})



//raw data in json format for frontend consumption
app.use("/users", userroutes);// this will mount the userroutes on the /users path, so all the routes defined in the userroutes will be prefixed with /users 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
   