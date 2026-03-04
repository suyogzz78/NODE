const mongoose = require('mongoose');


async function connecttodatabase(url){
    return mongoose.connect(url);

}

module.exports = {
    connecttodatabase
}