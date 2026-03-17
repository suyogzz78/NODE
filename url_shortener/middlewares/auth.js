const { getUser } = require("../utils/auth");


async function authMiddleware(req, res, next) {

    const uid = req.cookies.sessionId;

    if (!uid){
        return res.status(401).redirect('/login');
    }

    const user = getUser(uid);

    if (!user){
        return res.status(401).redirect('/login');
    }
req.user = user;

    next();
}

async function checkauthMiddleware(req, res, next) {

    const token = req.cookies.token;
     const user = getUser(token);

     req.user = user;//if user is not found, req.user will be undefined, which can be handled in the route handlers to allow access to public routes without authentication.
    next();

}
module.exports = { authMiddleware, checkauthMiddleware };