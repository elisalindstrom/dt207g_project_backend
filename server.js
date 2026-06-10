const express = require("express");
const cors = require("cors");
const db = require("./db") // Koppling till databas
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

/* Läs in routes
const authRoutes = require("./routes/authRoutes.js")
app.use("/users", authRoutes); */

// Middlewares
app.use(cors());
app.use(express.json());


// Starta server
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
})