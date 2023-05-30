const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Obtener todos los clientes
router.get('/', async (req, res, next) => {
  try {
    const clientes = await db.query('SELECT * FROM clientes');
    res.json(clientes);
  } catch (err) {
    next(err);
  }
});

// Obtener un solo cliente por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (cliente.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente[0]);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res, next) => {
  try {
    const { nombre, direccion, telefono } = req.body;
    const resultado = await db.query('INSERT INTO clientes (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono]);
    res.json({ id: resultado.insertId });
  } catch (err) {
    next(err);
  }
});

// Actualizar un cliente existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    await db.query('UPDATE clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre, direccion, telefono, id]);
    res.json({ message: 'Cliente actualizado exitosamente' });
  } catch (err) {
    next(err);
  }
});

// Eliminar un cliente existente
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
