const mongoose = require("mongoose");

// Schema User
const MenuSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Titel krävs"] },
    description: { type: String, required: [true, "Beskrivning krävs"] },
    price: { type: Number, required: [true, "Pris krävs"] }
})

// Export av model
module.exports = mongoose.model("Menu", MenuSchema);