let User = require("../models/user");
let Calories = require("../models/calories");
let Weight = require("../models/weight");

const CLIENT_ID = process.env.REACT_APP_GAINS_GOOGLE_CLIENT_ID;
const { OAuth2Client } = require("google-auth-library");
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
      const savedUser = await User.findByIdAndUpdate(userId, updatedUser, {
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
  login: async (req, res) => {
    try {
      //Loggin is based on the Google instructions https://developers.google.com/identity/sign-in/web/backend-auth
      const token = req.body.token;
      const googleResponse = await loginClient.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      });

      const payload = googleResponse.payload;
      const googleUserId = payload.sub;

      //Find the saved user and create it if it doesn't exist
      const query = { googleId: googleUserId };
      const user = await User.findOneAndUpdate(
        query,
        { email: payload.email, name: payload.name },
        { upsert: true }
      );
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  calories: async (req, res) => {
    try {
      const userId = req.params.id;

      //Mongoose search based on our own user id
      const calories = await Calories.find({ userId: userId });
      res.json(calories);
    } catch (err) {
      console.log(err);
    }
  },
  weight: async (req, res) => {
    try {
      const userId = req.params.id;
      //Mongoose search based on our own user id
      const weight = await Weight.find({ userId: userId });
      res.json(weight);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = userController;
