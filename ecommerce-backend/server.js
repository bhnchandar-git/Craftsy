const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL library

// Initialize Express app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Database connection details
const db = new Pool({
    user: 'postgresadmin',          // RDS username
    host: 'craftybox-db.cruyacaait1m.eu-north-1.rds.amazonaws.com', // RDS endpoint
    database: 'craftybox',          // Database name
    password: 'postgresadmin',      // Your RDS password
    port: 5432,                     // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false,  // Allow SSL connections without CA validation
    },
});


// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Connected to the PostgreSQL database.');
    }
});

// API endpoint to fetch products
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        res.json(result.rows); // Send product data as JSON
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
