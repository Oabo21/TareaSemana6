const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Obtener todos los productos
router.get('/', async (req, res, next) => {
  try {
    const productos = await db.query('SELECT * FROM productos');
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

// Obtener un solo producto por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (producto.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto[0]);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo producto
router.post('/', async (req, res, next) => {
  try {
    const { nombre, precio, descripcion, cantidad } = req.body;
    const resultado = await db.query('INSERT INTO productos (nombre, precio, descripcion, cantidad) VALUES (?, ?, ?, ?)', [nombre, precio, descripcion, cantidad]);
    res.json({ id: resultado.insertId });
  } catch (err) {
    next(err);
  }
});

// Actualizar un producto existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, cantidad } = req.body;
    await db.query('UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, cantidad = ? WHERE id = ?', [nombre, precio, descripcion, cantidad, id]);
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (err) {
    next(err);
  }
});

// Eliminar un producto existente
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
