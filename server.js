const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running. Use the /encrypt route to encrypt passwords.');
});

// Encrypt route
app.post('/encrypt', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).send('Password is required');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        res.json({ hashedPassword });
    } catch (error) {
        res.status(500).send('Error encrypting password');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
