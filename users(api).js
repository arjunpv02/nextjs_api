// Import database connection
import db from './db';
// Bcrypt for password hashing
import bcrypt from 'bcryptjs';

export default function handler(req, res) {
// Handle DELETE request (Delete a user by ID)
if (req.method === 'DELETE') {
const { id } = req.body; // Extract user ID from request body

if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
}

db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
    return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'User deleted successfully!' });
});
return;
}

// Handle PUT request (Update a user's password by ID)
if (req.method === 'PUT') {
const { id, password } = req.body; // Extract user ID and password from request body

if (!id || !password) {
    return res.status(400).json({ error: 'User ID and password are required' });
}

const hashedPassword = bcrypt.hashSync(password, 10); // Hash the new password

db.query(
    'UPDATE users SET password = ? WHERE id = ?',
    [hashedPassword, id],
    (err) => {
    if (err) {
        return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    res.status(200).json({ message: 'Password updated successfully!' });
    }
);
return;
}

// If any other HTTP method is used, respond with Method Not Allowed error
res.setHeader('Allow', ['DELETE', 'PUT']);
res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}


