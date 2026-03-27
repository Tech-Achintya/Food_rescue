const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Fetch all NGO users
// Get all users (optionally filtered by role)
router.get("/users", async (req, res) => {
  try {
    const { role } = req.query;
    console.log("🔍 Received role query:", role);

    let query = "SELECT id, name, contact, role, created_at FROM users";
    const params = [];

    if (role) {
      query += " WHERE role = ?";
      params.push(role);
    }

    console.log("🧠 Running SQL:", query, "with params:", params);

    const [rows] = await pool.query(query, params); // ✅ use pool here
    console.log("✅ Fetched rows:", rows);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Simple login/create by name+contact+role
router.post('/register', async (req, res) => {
  try {
    const { name, contact, role } = req.body;

    if (!name || !contact || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT * FROM users WHERE contact = ? AND role = ?',
      [contact, role]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'User already registered. Please login.' });
    }

    // Insert new user (auto add timestamp)
    const [result] = await pool.query(
      `INSERT INTO users (name, contact, role, created_at)
       VALUES (?, ?, ?, NOW())`,
      [name.trim(), contact.trim(), role]
    );

    // Fetch inserted record to confirm
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser[0],
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, contact, role } = req.body;

    // Check all fields
    if (!name || !contact || !role) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check if user exists
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE contact = ? AND role = ?',
      [contact, role]
    );

    // ❌ If no user found → return error
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not registered. Please register first.' });
    }

    // ✅ If found → send user data
    res.json(rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
