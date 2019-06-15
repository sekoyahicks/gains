const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const User = new Schema ({
    googleId: String,
    email: String,
    name: String
})

module.exports = mongoose.model('User', User)