const express = require("express");
const router = (express = express.Router());

const weightController = require("../controllers/weightController");

let weightController = {
  index: async (req, res) => {
    try {
      const weight = await Weight.find({});
      res.json(weight);
    } catch (err) {
      console.log(err);
    }
  },
  show: async (req, res) => {
    try {
      const weightId = req.params.id;
      const weight = await Weight.findById(weightId);
      res.json(weight);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      const newWeight = req.body;
      const savedWeight = await Weight.create(newWeight);
      res.json(savedWeight);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const weightId = req.params.id;
      const updatedWeight = req.body;
      const savedWeight = await Weight.findByIdAndUpdate(
        weightId,
        updatedWeight,
        { new: true }
      );
      res.json(savedWeight);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const weightId = req.params.id;
      await Weight.findByIdAndRemove(weightId);
      res.json({
        msg: "Succssfully Deleted"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = weightController;
