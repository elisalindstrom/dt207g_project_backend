const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authenticateToken = require("../middleware/authToken");

// Skapa bokning
router.post("/", async (req, res) => {
    try {
        const { date, time, guests, name, phone } = req.body;

        if (!date || !time || !guests || !name || !phone) return res.status(400).json({ message: "Fyll i datum, tid, antal gäster, namn och telefonnummer" });

        const booking = new Booking({ date, time, guests, name, phone });
        await booking.save();

        return res.status(201).json({ booking, message: "Din bokning är bekräftad!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// SKYDDADE ROUTES
// Hämta bokningar
router.get("/", authenticateToken, async (req, res) => {
    try {
        let result = await Booking.find().sort({ date: 1, time: 1 });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Hämta enskild bokning
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        let result = await Booking.findById(req.params.id);

        if (!result) return res.status(404).json({ message: "Bokningen kunde inte hittas" });

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Ta bort bokning
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        let result = await Booking.findByIdAndDelete(req.params.id);

        // Kontroll om något dokument med rätt ID hittats
        if (!result) return res.status(404).json({ message: "Bokningen kunde inte hittas" });

        return res.status(200).json({ result, message: "Borttagen" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;