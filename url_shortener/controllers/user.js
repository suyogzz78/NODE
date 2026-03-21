const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");

async function handleSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password. Please try again.",
    });
  }



  const token = setUser(user);
  res.cookie("token", token,{
    domain: "localhost", // Adjust this to your domain
  });

  //here the sessionId can be stored in a database or in-memory store to manage user sessions. For simplicity, we are just setting a cookie here.

  return res.redirect("/");
}

module.exports = { handleSignup, handleLogin };
