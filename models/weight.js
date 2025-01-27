const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Weight = new Schema ({
    userId: mongoose.Schema.Types.ObjectId,
    weightGoal: Number,
    currentWeight: Number,
    weightGained: Number,
    weightLost: Number
})

module.exports = mongoose.model('Weight', Weight)
