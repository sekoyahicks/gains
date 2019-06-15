// const express = require('express')
// const router = express = express.Router()

// const userController = require('..controllers/userController')
let User = require('../models/user');

const CLIENT_ID = process.env.REACT_APP_GAINS_GOOGLE_CLIENT_ID
const {OAuth2Client} = require('google-auth-library');
const loginClient = new OAuth2Client(CLIENT_ID);

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
      await User.findByIdAndRemove(userId);
      res.json({
        msg: "Successfully Deleted"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  login: async(req, res) => {
    try {
      const token = req.body.token;
      const googleResponse = await loginClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID 
      })

      const payload = googleResponse.payload
      const googleUserId = payload.sub

      const  query = {googleId: googleUserId}
      const user = await User.findOneAndUpdate(query, {email: payload.email, name: payload.name}, {upsert: true})
      res.json(user)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
