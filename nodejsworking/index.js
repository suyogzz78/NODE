const { log } = require('console');
const fs = require('fs')
//goes through event loop 
setTimeout(() => {
    console.log('hello i am the timer')
}, 0);


setImmediate(()=>{
    console.log('hello i am immediate fn');
    
})


fs.readFile('sample.txt','UTF-8',()=>{
    console.log('hello io polling ');
    setTimeout(() => {
        console.log('timer');
        
    }, 0);
    setTimeout(() => {
        console.log('timer5k');
        
    }, 5*1000);
    setImmediate(()=>{
        console.log('immediatefn');
        
    })
})
//top level code

console.log('hello i am suyog');