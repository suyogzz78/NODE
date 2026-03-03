//controlllers are function attached to the routes, they are responsible for handling the request and sending the response
const User = require('../model/user');



async function getAllUsers(req, res) {
 const dbusers = await User.find({});
  const html = `
    <ul> 
        ${dbusers
          .map((user) => {
            return `<li> ${user.first_name} ${user.last_name} - ${user.email} </li>`;
          })
          .join("")}

    </ul> 
    
    `;
  res.send(html);
}
async function getUserById(req, res) {
     const user = await User.findById(req.params.id);
  if(!user){
    return res.status(404).json({msg:"User not found"}) ;
  }
  return res.json(user);
}

async function patchUserById(req, res) {
     await User.findByIdAndUpdate(req.params.id, {last_name: "Updated last name"});// this will update the user document with the given id and return the updated document in the response
    return res.send("PATCH request received for user with id: " + req.params.id);

}
async function deleteUserById(req, res) {
      await User.findByIdAndDelete(req.params.id);// this will delete the user document with the given id and return the deleted document in the response
    return res.send("DELETE request received for user with id: " + req.params.id);
}
async function handlecreateUser(req, res) {
     const body = req.body;
      if(!body || !body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({msg:"Bad request, missing required fields"});
      }  
       
      // users.push({...body, id: users.length + 1});
      // filesystem.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
      //     return res.status(201).json({//201 is the status code for created resource
      //       status:"success",
      //       id: users.length
      //     });   

      // });
  const result = await User.create({ 
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    car_model: body.car_model,
  })
      console.log("User created successfully", result);

  return res.status(201).json({msg:"User created successfully", id: result._id});
}
module.exports = {
  getAllUsers,
  getUserById,
  patchUserById,
  deleteUserById,
  handlecreateUser

};