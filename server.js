const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Default route to confirm server is running
app.get("/", (req, res) => {
    res.send("Server is running. Use the /encrypt route to encrypt passwords.");
});

// Endpoint for encryption
app.post("/encrypt", (req, res) => {
    const password = req.body.password; // Password received from Zoho
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex"); // Encrypt using SHA-256
    res.json({ encrypted_value: hashedPassword }); // Return encrypted password
});

// Server listening
app.listen(3000, () => {
    console.log("Encryption API running on http://localhost:3000");
});
