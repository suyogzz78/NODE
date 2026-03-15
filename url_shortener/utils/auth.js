const sessionidtouserid = new Map();


function setUser(id,user){
    sessionidtouserid.set(id,user);
}

function getUser(id){
    return sessionidtouserid.get(id);


}


module.exports = {setUser,getUser};