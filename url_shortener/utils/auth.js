const jwt = require('jsonwebtoken');
const secretKey = "suyog1212"; // In production, use an environment variable to store the secret key


function setUser(user){

    const payload = {
        id:user._id,
        email:user.email,
        
    }
    return jwt.sign(payload,secretKey,{expiresIn:'1h'});
}

function getUser(token){
    if(!token) return null;
    try{
    return jwt.verify(token,secretKey);

    }
    catch(err){
        return null;
    }

}


module.exports = {setUser,getUser};