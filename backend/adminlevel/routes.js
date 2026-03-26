// backend/adminlevel/routes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: "Missing fields" });

  const hash = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hash]
    );
    const userId = result.insertId;

    await db.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT role_id FROM roles WHERE role_name=?))",
      [userId, role]
    );

    res.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.query(
      `SELECT u.user_id, u.username, u.password_hash, r.role_name
       FROM users u
       JOIN user_roles ur ON u.user_id = ur.user_id
       JOIN roles r ON ur.role_id = r.role_id
       WHERE u.username = ?`,
      [username]
    );

    if (users.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.user_id, role: user.role_name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: '8h' }
    );

    res.json({
      id: user.user_id,
      username: user.username,
      role: user.role_name,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;