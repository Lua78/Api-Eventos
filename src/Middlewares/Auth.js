const JWT = require('../Services/AuthService')

async function validateToken(req, res, next) {
  if (req.path === '/api/usuarios/login') {
    next();
    return
  }
  const token = req.headers.authorization || ''
  if (!token || token == '') {
    res.status(401).json({ error: "No tienes acceso a esta ruta." })
    return;
  }
  try {
    const data = JWT.verificarToken(token.split(' ')[1]);
    if (data) {
      req.payload = data
      next();
    } else {
      res.status(401).json({ error: 'Token no válido.' });
    }
  } catch (error) {
    console.error('Error al validar el token:', error.message);
    res.status(500).json({ error: 'No tienes acceso a esta ruta.' });
  }
}

module.exports = validateToken;