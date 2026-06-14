const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authToken"); // Middleware

// Registrering
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Ange användarnamn och lösenord" });

        const user = new User({ username, password });
        await user.save();

        return res.status(201).json({ message: "Användare skapad" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Inloggning
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Ange användarnamn och lösenord" });

        // Kontroll användarnamn
        let user = await User.findOne({ username: username });
        if (!user) return res.status(401).json({ message: "Fel användarnamn eller lösenord" });

        // Kontroll lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) return res.status(401).json({ message: "Fel användarnamn eller lösenord" });

        // Skapar JWT-token
        const payload = { username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        user = await User.findOne({ username: username }, { password: 0 });

        const response = {
            message: "Användare inloggad",
            user,
            token
        };

        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;