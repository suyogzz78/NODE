const express = require("express");
const app = express();
const port = 3000;
const filesystem = require("fs");
const users = require("./MOCK_DATA.json");
 const mongoose = require("mongoose");
const { type } = require("os");

//connect to the database
mongoose
.connect("mongodb://127.0.0.1:27017/")
.then(()=>{
  console.log("Connected to the database");
})
.catch((err)=>{
  console.log("Error connecting to the database", err);
})

 const Userschema = new mongoose.Schema({// this is the schema for the user model, it defines the structure of the user document in the database
  first_name :{
    type: String,
    required: true
  },
  last_name :{
    type: String,
  },
  email :{
    type: String,
    required: true,
    unique: true // this will ensure that no two users can have the same email address in the database
  },
  gender :{
    type: String,
  },
  car_model :{
    type: String,
  }


 })


 const User = mongoose.model("User", Userschema); // this is the user model, it is used to interact with the user collection in the database

//middleware

app.use(express.urlencoded({ extended: false }));


app.use((req,res,next)=>{

  console.log("hello from the middleware 1");
  filesystem.appendFile("log.txt",`\n ${Date.now()} ${req.method}${req.url}\n`,(err)=>{
     next(); // here we are calling the next middleware in the stack, if we don't call next() the request will be stuck in this middleware and will never reach the route handler
})
  });
 // return res.end("response from middleware 1");//res.end() is used to end the response and send it back to the client, if we don't call res.end() or res.send() the request will be stuck in this middleware and will never reach the route handler
 
app.use((req,res,next)=>{

  console.log("hello from the middleware 2");// we can use multiple middlewares in our application and they will be executed in the order they are defined
  next(); // here we are calling the next middleware in the stack, if we don't call next() the request will be stuck in this middleware and will never reach the route handler
})



//raw data in json format for frontend consumption
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//html data for server side rendering
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users
          .map((user) => {
            return `<li> ${user.first_name} ${user.last_name} </li>`;
          })
          .join("")}

    </ul>
    
    `;
  res.send(html);
});
app.route("/api/users/:id").get((req, res) => {
  //using dynamic route parameter

  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if(!user){
    return res.status(404).json({msg:"User not found"}) ;
  }
  return res.json(user);
}).patch((req,res)=>{
    return res.send("PATCH request received for user with id: " + req.params.id);
})
.put((req,res)=>{
    return res.send("PUT request received for user with id: " + req.params.id);
})
.delete((req,res)=>{
    return res.send("DELETE request received for user with id: " + req.params.id);
});


app.post("/api/users", (req, res) => {

      const body = req.body;
      if(!body || !body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({msg:"Bad request, missing required fields"});
      }  
       
      users.push({...body, id: users.length + 1});
      filesystem.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
          return res.status(201).json({//201 is the status code for created resource
            status:"success",
            id: users.length
          });   

      });
  
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
