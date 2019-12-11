const express = require('express');
const connectDB = require('./config/db');
const { config } = require('dotenv');
const path = require('path');

// read env variables before app initialization
config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//* serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));

	app.get('*', (req, res) => res.sendFile(__dirname, '../', 'client', 'build', 'index.html'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
