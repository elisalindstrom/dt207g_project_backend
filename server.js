const express = require("express");
const cors = require("cors");
const db = require("./db") // Koppling till databas
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

// Läs in routes
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/menu", menuRoutes)
app.use("/api/booking", bookingRoutes);

// Starta server
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
})