const express = require('express');
const router = express.Router();
const pool = require('../db');

// Simple login/create by name+contact+role
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
