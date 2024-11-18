// pages/api/register.js
import db from './db';
import bcrypt from 'bcryptjs';

export default function handler(req, res) {
if (req.method === 'POST') {
const { username, password } = req.body;

// Check if username is unique
db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (result.length > 0) {
    return res.status(400).json({ error: 'Username already exists.' });
    }

    // Hash the password and save user
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User registered successfully!' });
    }
    );
});
}
}
