const mongoose = require('..db/connection.js')
const Schema = mongoose.Schema

const User = new Schema ({
    username: String,
    password: String
})

module.exports = mongoose.user('User', User)