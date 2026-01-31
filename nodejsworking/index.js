const fs = require('fs')
const crypto = require('crypto');
//goes through event loop 

process.env.UV_THREADPOOL_SIZE=5; //default is 4
setTimeout(() => {
    console.log('hello i am the timer')
}, 0);

const start = Date.now();
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

    crypto.pbkdf2('password1','salt',100000,512,'sha512',()=>{
        console.log(`${Date.now() - start}`,'password1 encrypted');
    });
     crypto.pbkdf2('password2','salt',100000,512,'sha512',()=>{
        console.log(`${Date.now() - start}`,'password2 encrypted');
    });
     crypto.pbkdf2('password3','salt',100000,512,'sha512',()=>{
        console.log(`${Date.now() - start}`,'password3 encrypted');
    });
     crypto.pbkdf2('password4','salt',100000,512,'sha512',()=>{
        console.log(`${Date.now() - start}`,'password4 encrypted');
    });
     crypto.pbkdf2('password5','salt',100000,512,'sha512',()=>{
        console.log(`${Date.now() - start}`,'password5 encrypted');
    });

    // here the threadpool size is 4 by default so only 4 crypto functions will run parallelly and the 5th one waits for its turn

})
//top level code

console.log('hello i am suyog');