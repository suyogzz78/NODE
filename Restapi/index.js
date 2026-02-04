const express = require("express");
const app = express();
const port = 3000;
const users = require("./MOCK_DATA.json");

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
    return res.send("POST request received to create a new user");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
