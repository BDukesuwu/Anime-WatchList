// Import the mongoose library
const mongoose = require('mongoose');

// Set strictQuery option
mongoose.set('strictQuery', true); // or false, based on your preference


// Connect to MongoDB using the connection string from the environment variables
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, // Use the new URL string parser to avoid deprecation warnings
    useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
});

// Get the connection instance
const db = mongoose.connection;

// Listen for the 'connected' event when the connection is established
db.on('connected', function (){
    // Log a message indicating that the connection was successful
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// Listen for errors and disconnections
db.on('error', function (err) {
    // Log an error message if the connection fails
    console.error('MongoDB connection error:', err);
});

// Log a message when the connection is disconnected
db.on('disconnected', function () {
    console.log('MongoDB connection disconnected');
});