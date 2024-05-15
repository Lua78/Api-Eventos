const bcrypt = require('bcrypt');

async function generarHash(contrasenia) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(contrasenia, saltRounds);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function verificarContrasenia(contrasenia, hash) {
    try {
        const resultado = await bcrypt.compare(contrasenia, hash);
        return resultado;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarHash,
    verificarContrasenia
};
