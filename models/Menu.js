const mongoose = require("mongoose");

// Schema Menu
const MenuSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Titel krävs"], trim: true },
    description: { type: String, required: [true, "Beskrivning krävs"], trim: true },
    price: { type: Number, required: [true, "Pris krävs"], min: [1, "Pris måste vara minst 1 kr"] }
})

// Export av model
module.exports = mongoose.model("Menu", MenuSchema);