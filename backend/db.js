const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB");
        return mongoose.connection;
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;