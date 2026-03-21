// const { getUser } = require("../utils/auth");

// async function authMiddleware(req, res, next) {
//   const userid = req.headers["authorization"]; // Assuming the token is sent in the format "Bearer <token>"

//   if (!userid) {
//     return res.status(401).redirect("/login");
//   }
//   const token = userid.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.status(401).redirect("/login");
//   }
//   req.user = user;

//   next();
// }

// async function checkauthMiddleware(req, res, next) {
//   // const token = req.cookies.token;
//   //  const user = getUser(token);

//   //  req.user = user;//if user is not found, req.user will be undefined, which can be handled in the route handlers to allow access to public routes without authentication.
//   // next();

//   const userid = req.headers["authorization"]; // Assuming the token is sent in the format "Bearer <token>"
//    if (!userid) {
//     return res.status(401).redirect("/login");
//   }
//   const token = userid.split("Bearer ")[1]; // Extract the token part from the "Bearer <token
//   const user = getUser(token);
//   req.user = user;
//   next();
// }
// module.exports = { authMiddleware, checkauthMiddleware };
const { getUser } = require("../utils/auth");

// Middleware for protected routes (must be logged in)
async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; // may be undefined

  if (!authHeader) {
    return res.status(401).redirect("/login"); // no token → redirect
  }

  const token = authHeader.split(" ")[1]; // safe extraction
  const user = getUser(token);

  if (!user) {
    return res.status(401).redirect("/login"); // invalid token
  }

  req.user = user;
  next();
}

// Middleware for optional auth (public + private routes)
async function checkauthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    req.user = undefined; // optional → allow public access
    return next();
  }

  const token = authHeader.split(" ")[1];
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = { authMiddleware, checkauthMiddleware };