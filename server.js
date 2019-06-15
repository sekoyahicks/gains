const express = require("express");
const logger = require("morgan");
const router = express.Router();
const app = express();
const userRoute = require("./routes/userRoute");
const caloriesRoute = require("./routes/caloriesRoute");
const weightRoute = require("./routes/weightRoute");
app.use(express.json());

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/client/build`));


app.use("/calories", caloriesRoute);
app.use("/weight", weightRoute);
app.use("/users", userRoute);

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("App is up and running on port " + PORT);
});
