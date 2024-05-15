const JWT = require('jsonwebtoken')

const jwt = require('jsonwebtoken');

function generarToken(payload, expiresIn = '1d') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}
function verificarToken(token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarToken,
    verificarToken
};
