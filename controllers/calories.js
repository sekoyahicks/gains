const express = require("express");
const router = (express = express.Router());

const caloriesController = require("../controllers/caloriesController");

let caloriesController = {
  index: async (req, res) => {
    try {
      const calories = await Calories.find({});
      res.json(calories);
    } catch (err) {
      console.log(err);
    }
  },
  show: async (req, res) => {
    try {
      const caloriesId = req.params.id;
      const calories = await Calories.findById(caloriesId);
      res.json(calories);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      const newCalories = req.body;
      const savedCalories = await Calories.create(newCalories);
      res.json(savedCalories);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const caloriesId = req.params.id;
      const updatedCalories = req.body;
      const savedCalories = await Calories.findByIdAndUpdate(
        caloriesId,
        updatedCalories,
        { new: true }
      );
      res.json(savedCalories);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const caloriesId = req.params.id;
      await Calories.findByIdAndRemove(caloriesId);
      res.json({
        msg: "Succssfully Deleted"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = caloriesController;