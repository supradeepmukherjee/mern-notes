const mongoose = require('mongoose')
const mongoURI = ''


const connectToMongo = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI)
    console.log('connected');
}

module.exports = connectToMongo