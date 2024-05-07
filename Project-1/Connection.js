const mongoose = require("mongoose")

async function connectMongoDB (connectionStr){
    return mongoose.connect(connectionStr)
}

module.exports = {
    connectMongoDB
}