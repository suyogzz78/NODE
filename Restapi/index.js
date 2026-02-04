const express = require('express');
const app = express();
const port = 3000;
const users = require("./MOCK_DATA.json")

//raw data in json format for frontend consumption
app.get('/api/users',(req,res)=>{
 return res.json(users);
})

//html data for server side rendering
app.get('/users',(req,res)=>{
    const html=
    
    `
    <ul>
        ${users.map((user)=>{
            return `<li> ${user.first_name} ${user.last_name} </li>`;
        }).join('')}

    </ul>
    
    `
res.send(html);
    
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port      }`);
})