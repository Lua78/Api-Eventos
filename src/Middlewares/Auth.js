const JWT = require('../Services/AuthService')

async function validateToken(req, res, next) {
  if (req.path === '/api/usuarios/login') {
    next();
    return
  }
  if (req.method === 'OPTIONS') {
    console.log("Headers en OPTIOnS",req.headers)
     res.status(200).json({code:1});
     return
  }
  const token = req.headers.authorization || ''
  if (!token || token == 'Bearer null' || token == '') {
    console.log("No se ha proporcionado el token..", req.headers)
    res.status(401).json({ error: "No tienes acceso a esta ruta." })
    return;
  }
  try {
    const data = JWT.verificarToken(token.split(' ')[1]);
    if (data) {
      req.payload = data
      next();
    } else {
      console.log("Token invalido..")
      res.status(401).json({ error: 'Token no válido.' });
      return 
    }
  } catch (error) {
    console.error('Error al validar el token:', error.message);
    res.status(500).json({ error: 'error interno.' });
  }
}

module.exports = validateToken;