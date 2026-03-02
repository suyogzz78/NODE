const filesystem = require("fs");

function logrequest(filename){

    return (req,res,next)=>{



  console.log("hello from the middleware 1");
  filesystem.appendFile(filename,`\n ${Date.now()} ${req.method}${req.url}\n`,(err)=>{
     next(); // here we are calling the next middleware in the stack, if we don't call next() the request will be stuck in this middleware and will never reach the route handler
})
    };

}

module.exports = {logrequest};