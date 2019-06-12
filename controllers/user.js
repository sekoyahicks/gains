// const express = require('express')
// const router = express = express.Router()

// const userController = reuire('..controllers/userController')
let User = require('../models/User');

let userController = {
  index: async (req, res) => {
    try {
      const user = await User.find({});
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
  show: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      const newUser = req.body;
      const savedUser = await User.create(newUser);
      res.json(savedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      const savedUser = await User.findByIdAndUpdate(UserId, updatedUser, {
        new: true
      });
      res.json(savedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndRemove(excuseId);
      res.json({
        msg: "Successfully Deleted"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
