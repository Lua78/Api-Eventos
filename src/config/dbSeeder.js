const mysql = require('mysql2/promise');
const encrypt = require('../utils/bcrypt')
async function seedDatabase() {
  const connection = await mysql.createConnection({
    database : 'eventos',
    host: 'localhost',
    user: 'EVENTOS_ADMIN',
    password: "EVENTOS2024"
});

  try {
    // Insertar datos de ejemplo en una tabla
    await connection.execute('INSERT INTO departamento (Nombre) VALUES (?)', ['Economia y Negocios']);
    await connection.execute('INSERT INTO carrera (Nombre, idDepartamento) VALUES (?, ?)', ['Administracion', 1]);
    await connection.execute('INSERT INTO alumno (Carne, Nombre, direccion, telefono, FecNac, correo) VALUES (?,?,?,?,?,?)', 
    ['00000', 'Administrador','delRoot2CalUser','8888-8888','1940/01/01','el@admin.god']);
    await connection.execute('INSERT INTO carreraest (Carne, idCarrera, anioIngreso) VALUES (?, ?, ?)', ['00000', 1, 2024]);


    const pass = await encrypt.generarHash("adminadmin")
    await connection.execute('INSERT INTO usuario (CARNE_ALUMNO, NOMBRE_USUARIO, CONTRASENA, IS_ADMIN) VALUES (?, ?, ?, ?)', 
    ['00000', 'adminis',pass,1]);

    console.log('Datos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    // Cerrar la conexión
    await connection.end();
  }
}

seedDatabase();
