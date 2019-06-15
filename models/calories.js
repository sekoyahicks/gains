const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Calories = new Schema ({
    userId: mongoose.Schema.Types.ObjectId,
    caloriesNeeded: Number,
    caloriesConsumed: Number
})

module.exports = mongoose.model('Calories', Calories)