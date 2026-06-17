const mongoose = require("mongoose");
require('dotenv').config();

// Databaskoppling
mongoose.connect(process.env.URI).then(() => {
    console.log("Connected to Mongodb");
}).catch((error) => {
    console.error("Error connecting to db:" + error);
})

module.exports = mongoose;