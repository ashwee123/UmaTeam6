// backend/server.js
const express = require('express');
const app = express();
const inventoryRoutes = require('./inventory');
const authRoutes = require('./adminlevel/routes');

app.use(express.json());

// Auth routes
app.use('/auth', authRoutes);

// Inventory routes (protected)
app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));