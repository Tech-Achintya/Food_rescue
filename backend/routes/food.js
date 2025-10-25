const express = require('express');
const router = express.Router();
const pool = require('../db');

/** Get all categories (veg/nonveg + category) */
router.get('/categories', async (req,res) => {
  const [rows] = await pool.query('SELECT * FROM food_categories');
  res.json(rows);
});

/** Add a category */
router.post('/categories', async (req,res) => {
  const { type, category } = req.body;
  const [r] = await pool.query('INSERT INTO food_categories (type,category) VALUES (?,?)', [type,category]);
  const [row] = await pool.query('SELECT * FROM food_categories WHERE id=?',[r.insertId]);
  res.json(row[0]);
});

/** Get items by category id or all */
router.get('/items', async (req,res) => {
  const { category_id } = req.query;
  if (category_id) {
    const [rows] = await pool.query('SELECT * FROM food_items WHERE category_id=?',[category_id]);
    return res.json(rows);
  }
  const [rows] = await pool.query('SELECT fi.*, fc.type, fc.category AS category_name FROM food_items fi JOIN food_categories fc ON fi.category_id = fc.id');
  res.json(rows);
});

/** Add food item */
router.post('/items', async (req,res) => {
  const { category_id, name } = req.body;
  const [r] = await pool.query('INSERT INTO food_items (category_id,name) VALUES (?,?)', [category_id,name]);
  const [row] = await pool.query('SELECT * FROM food_items WHERE id=?',[r.insertId]);
  res.json(row[0]);
});

module.exports = router;
