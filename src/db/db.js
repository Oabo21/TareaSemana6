const mysql = require('mysql');
const util = require('util');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Promisify para utilizar async-await con las consultas
db.query = util.promisify(db.query).bind(db);

module.exports = db;
