const {getUser} = require('./../utils/auth');

// Middleware for optional auth (public + private routes)
async function checkauthMiddleware(req, res, next) {
  const tokencookie = req.cookies?.token; // Check for token in cookies
  req.user = null; // Default to null (unauthenticated)

  if(!tokencookie) return next(); // No token, proceed as unauthenticated

  const token = tokencookie // Extract token if it exists
  const user = getUser(token);
  req.user = user;
  return next();
}

function restriction(Roles = []) {
  return function(req, res, next) {
    console.log("req.user:", req.user); // Add this
    console.log("req.user.role:", req.user?.role); // Add this
    
    if (!req.user) {
      console.log("No user found"); // Add this
      return res.status(401).redirect("/login");
    }
    if (!Roles.includes(req.user.role)) {
      console.log(`Role ${req.user.role} not in ${Roles}`); // Add this
      return res.status(403).send("Access denied");
    }
    next();
  }
}

module.exports = {   checkauthMiddleware, restriction }; 