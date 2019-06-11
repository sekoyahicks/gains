const express = require('express');
const app = express();
const router = express.Router()
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Magic happening on port " + PORT);
})