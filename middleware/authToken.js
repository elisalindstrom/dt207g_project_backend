const jwt = require("jsonwebtoken");

// Validering av token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token

    // Token saknas
    if (!token) return res.status(401).json({ message: "Inte behörig för denna route, token saknas" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
        if (error) return res.status(403).json({ message: "Felaktig JWT" });

        req.username = username;
        next();
    })
}

module.exports = authenticateToken;