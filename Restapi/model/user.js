
const mongoose = require('mongoose');

// Define the user schema
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


 },{timestamps: true});// this will add createdAt and updatedAt fields to the user document in the database


 const User = mongoose.model("User", Userschema);

 module.exports = User;