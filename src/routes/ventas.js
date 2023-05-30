const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Obtener todas las ventas
router.get('/', async (req, res, next) => {
  try {
    const ventas = await db.query('SELECT * FROM ventas');
    res.json(ventas);
  } catch (err) {
    next(err);
  }
});

// Obtener una sola venta por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const venta = await db.query('SELECT * FROM ventas WHERE id = ?', [id]);
    if (venta.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(venta[0]);
  } catch (err) {
    next(err);
  }
});

// Crear una nueva venta
router.post('/', async (req, res, next) => {
  try {
    const { producto_id, cliente_id, cantidad, precio } = req.body;
    const resultado = await db.query('INSERT INTO ventas (producto_id, cliente_id, cantidad, precio) VALUES (?, ?, ?, ?)', [producto_id, cliente_id, cantidad, precio]);
    res.json({ id: resultado.insertId });
  } catch (err) {
    next(err);
  }
});

// Actualizar una venta existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { producto_id, cliente_id, cantidad, precio } = req.body;
    await db.query('UPDATE ventas SET producto_id = ?, cliente_id = ?, cantidad = ?, precio = ? WHERE id = ?', [producto_id, cliente_id, cantidad, precio, id]);
    res.json({ message: 'Venta actualizada exitosamente' });
  } catch (err) {
    next(err);
  }
});

// Eliminar una venta existente
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM ventas WHERE id = ?', [id]);
    res.json({ message: 'Venta eliminada exitosamente' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
