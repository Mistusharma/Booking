require('dotenv').config();
const express = require("express")
const app = express();
const port = process.env.PORT;
const auth = require('./routes/auth')
const pool = require('./Database/index');
const cors = require('cors')
app.use(cors());

// Middleware
app.use(express.json());

// Connect to the database
pool.connect()
    .then(() => {
        console.log('Database connection established');
    })
    .catch(err => {
        console.error('Database connection error', err);
        process.exit(-1);
    });

// Routes
app.use('/auth', auth);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});