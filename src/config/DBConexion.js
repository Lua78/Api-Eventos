
const mysql = require('mysql2/promise');

const conexion = {
    database : process.env.DB_NAME,
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const executeQuery = async (query, params = []) => {
    const conn = await mysql.createConnection(conexion);
    try {
        const [rows, fields] = await conn.execute(query, params);
        return rows;
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        await conn.end();
    }
};

module.exports = executeQuery