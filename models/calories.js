const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Calories = new Schema ({
    caloriesNeeded: Number,
    caloriesConsumed: Number
})

module.exports = mongoose.model('Calories', Calories)