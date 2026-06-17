const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authToken"); // Middleware

// Skyddad route för registrering av användarkonton
router.post("/register", authenticateToken, async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Ange användarnamn och lösenord" });

        await User.register(username, password);

        return res.status(201).json({ message: "Användare skapad" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({error: "Användarnamn upptaget"});
        }
        return res.status(500).json({ message: error.message });
    }
})

// Inloggning
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Ange användarnamn och lösenord" });

        // Kontroll användarnamn + lösenord
        let user = await User.login(username, password);

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