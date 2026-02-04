
const filesystem = require("fs")// so fs is a builtin module in node which helps to interact with files

filesystem.writeFileSync('./suyogtest.txt','a bright future');
//this will create a file named suyogtest in the same directory
filesystem.writeFile('./suyogtest.txt','great day',(err)=>{});
//async in this we need to provide a callback for errors

const read = filesystem.readFileSync('./reading.txt','utf-8');
console.log(read);

//here in async we dont have a return type
filesystem.readFile('./reading.txt','utf-8',(err,readresult)=>{
    if(err){
        console.log("Error is ",err);
        
    }
    else{
        console.log(readresult);
        
    }
})

filesystem.appendFileSync("./reading.txt",`${Date.now()} Hello There \n`);
filesystem.unlinkSync("./test.txt")