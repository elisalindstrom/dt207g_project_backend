const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Användarnamn krävs"], unique: true, trim: true },
    password: { type: String, required: [true, "Lösenord krävs"] },
    created: { type: Date, default: Date.now }
})

// Hashning av lösenord innan user lagras
UserSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
})

// Registrering
UserSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

// Jämför lösenord med sparat lösenord
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

// Inloggning
UserSchema.statics.login = async function (username, password) {
    try {
        // Kontroll av användarnamn
        const user = await this.findOne({ username });

        if (!user) {
            throw new Error("Fel användarnamn eller lösenord");
        }

        // Kontroll lösenord
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            throw new Error("Fel användarnamn eller lösenord");
        }

        return user;
    } catch (error) {
        throw error;
    }
}

// Export av model
module.exports = mongoose.model("User", UserSchema);