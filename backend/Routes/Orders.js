const express = require('express')
const router = express.Router()
const order = require('../models/Ordermodel')


router.post('/orders', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { order_date: req.body.order_date });

        let emailid = await order.findOne({ email: req.body.email });
        if (emailid === null) {
            await order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }
        res.json({ success: true }); // Ensure JSON response
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: error.message }); // JSON error response
    }
});

router.post('/myorders', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userOrders = await order.findOne({ email: userEmail });

        if (!userOrders) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.json({ success: true, order_data: userOrders.order_data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



module.exports = router
