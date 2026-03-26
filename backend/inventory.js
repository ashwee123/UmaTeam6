// backend/inventory.js
const express = require('express');
const router = express.Router();

const db = require('./db');
const authenticate = require('./adminlevel/auth');
const authorize = require('./adminlevel/authorize');

// Manager/Admin can set prices
router.put('/:id/price',
  authenticate,
  authorize(['manager', 'admin']),
  async (req, res) => {
    const { price } = req.body;
    try {
      await db.query("UPDATE inventory SET price=? WHERE item_id=?", [price, req.params.id]);
      res.json({ message: "Price updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating price" });
    }
  }
);

// Employee/Admin can update inventory quantity
router.put('/:id/quantity',
  authenticate,
  authorize(['employee', 'manager', 'admin']),
  async (req, res) => {
    const { quantity } = req.body;
    try {
      await db.query("UPDATE inventory SET quantity=? WHERE item_id=?", [quantity, req.params.id]);
      res.json({ message: "Inventory updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating inventory" });
    }
  }
);

module.exports = router;