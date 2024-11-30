const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get sales analytics
router.get('/sales', [auth, admin], async (req, res) => {
    try {
        const dailySales = await Order.aggregate([
            {
                $match: {
                    status: 'delivered',
                    createdAt: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$totalAmount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(dailySales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get product analytics
router.get('/products', [auth, admin], async (req, res) => {
    try {
        const productStats = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);

        res.json(productStats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 