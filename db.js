// pages/api/db.js
import mysql from 'mysql2'; // MySQL2 for database interaction

// Establish connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Hostname (from environment variables)
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
});

// Test the database connection
db.connect((err) => {
if (err) {
console.error('DB connection failed: ', err); // Log the error if connection fails
} else {
console.log('DB connected successfully'); // Log success message
}
});

// Export the connection for use in API routes
export default db;
