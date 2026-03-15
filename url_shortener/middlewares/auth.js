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
module.exports = authMiddleware;