const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const authenticateToken = require("../middleware/authToken");

// Hämta hela menyn
router.get("/", async (req, res) => {
    try {
        let result = await Menu.find();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Hämta dokument (maträtt) från menyn
router.get("/:id", async (req, res) => {
    try {
        let result = await Menu.findById(req.params.id);

        if (!result) return res.status(404).json({ message: "Menyalternativet kunde inte hittas" });

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// SKYDDADE ROUTES
// Lägg till
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) return res.status(400).json({ message: "Fyll i titel, beskrivning och pris" });

        const item = new Menu({ title, description, price });
        await item.save();

        return res.status(201).json({ item, message: "Ny rätt skapad!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Ta bort
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        let result = await Menu.findByIdAndDelete(req.params.id);

        // Kontroll om något dokument med rätt ID hittats
        if (!result) return res.status(404).json({ message: "Menyalternativet kunde inte hittas" });

        return res.status(200).json({ result, message: "Borttagen" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Ändra
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const result = await Menu.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true });

        if (!result) return res.status(404).json({ message: "Menyalternativet kunde inte hittas" });

        return res.status(200).json({ result, message: "Rätten uppdaterad!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;