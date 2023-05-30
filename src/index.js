const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const productosRoutes = require('./routes/productos');
const clientesRoutes = require('./routes/clientes');
const ventasRoutes = require('./routes/ventas');

// Rutas del recurso "productos"
app.use('/productos', productosRoutes);

// Rutas del recurso "clientes"
app.use('/clientes', clientesRoutes);

// Rutas del recurso "ventas"
app.use('/ventas', ventasRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});