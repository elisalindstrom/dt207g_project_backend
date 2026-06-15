const mongoose = require("mongoose");

// Schema User
const BookingSchema = new mongoose.Schema({
    date: { type: Date, required: [true, "Datum krävs"] },
    time: { type: String, required: [true, "Tid krävs"] },
    guests: { type: Number, required: [true, "Antal gäster krävs"], min: [1, "Minst en gäst krävs"] },
    name: { type: String, required: [true, "Namn krävs"] },
    phone: { type: String, required: [true, "Telefonnummer krävs"] }
}, { timestamps: true })

// Export av model
module.exports = mongoose.model("Booking", BookingSchema);