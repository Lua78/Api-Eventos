
const mysql = require('mysql2/promise');

const conexion = {
    database : process.env.DB_NAME,
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    typeCast: function (field, next) {
        if (field.type === 'BIT' && field.length === 1) {
          const buffer = field.buffer();
          return buffer[0] === 1 ? 1 : 0;
        }
        return next();
    }
}
const executeQuery = async (query, params = []) => {
    const conn = await mysql.createConnection(conexion);
    try {
        const parametrosDefinidos = params.map(param => param !== undefined ? param : null);
        const [rows, fields] = await conn.execute(query, parametrosDefinidos);
        return rows;
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        await conn.end();
    }
};

module.exports = executeQuery