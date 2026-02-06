const express = require("express");
const app = express();
const port = 3000;
const filesystem = require("fs");
const users = require("./MOCK_DATA.json");

//middleware

app.use(express.urlencoded({ extended: false }));

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
      users.push({...body, id: users.length + 1});
      filesystem.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
          return res.json({
            status:"success",
            id: users.length
          });

      });
  
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
