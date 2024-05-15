const encrypt = require('../utils/bcrypt');
const Usuario = require('../Data/dataUsuarios');
const JWT = require('../Services/AuthService')

const login = async (req, res) => {
  const data = req.body.data;

  try {
    const usuario = await Usuario.getUsuario(data.usuario);
    if (!usuario) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
    const contraseniaValida = await encrypt.verificarContrasenia(data.contrasena, usuario.contrasena);
    if (!contraseniaValida) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
    const payload = {
      nombre_usuario: usuario.nombre_usuario,
      carne_alumno: usuario.carne_alumno,
      is_admin: usuario.is_admin
    };
    const token = await JWT.generarToken(payload)
    res.json({ mensaje: 'Inicio de sesión exitoso', token: token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
  }
}


const get = async (req,res) => {
  try {
      const datos = await Usuario.get()
      res.status(200).json({datos})
  } catch (error) {
      res.status(500).json({error})
  }
}

const post = async (req,res) => {
  try {
      const data = req.body.data
      data.contrasena = await encrypt.generarHash(data.contrasena)
      const datos = await Usuario.add(data)
      res.status(200).json({datos})
  } catch (error) {
      res.status(500).json({error})
  }
}
const update = async (req,res) => {
  try {
      const data = req.body.data
      const datos = await Usuario.update(data)
      res.status(200).json({datos})
  } catch (error) {
      res.status(500).json({error})
  }
}

const del = async (req,res) => {
  try {
      const carne = req.params.carne
      const datos = await Usuario.del(carne)
      res.status(200).json({datos})
  } catch (error) {
      res.status(500).json({error})
  }
}






module.exports = {
  login,
  get,
  del,
  update,
  post
};
