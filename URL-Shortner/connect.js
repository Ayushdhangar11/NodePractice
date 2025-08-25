const mongoose = require('mongoose');

async function connectToMongoDB(Url) {
    return mongoose.connect(Url);
}

module.exports = connectToMongoDB;
