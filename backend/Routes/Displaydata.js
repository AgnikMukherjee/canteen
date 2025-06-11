const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/foodData', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const foodData = await db.collection("foodData").find({}).toArray();
        const foodCategory = await db.collection("foodCategory").find({}).toArray();
        res.send([foodData, foodCategory]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;