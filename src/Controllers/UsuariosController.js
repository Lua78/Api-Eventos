const encrypt = require('../utils/bcrypt');
const Usuario = require('../Data/dataUsuarios');
const Alumno = require('../Data/dataAlumnos');
const JWT = require('../Services/AuthService')

const login = async (req, res) => {
  const data = req.body;
  console.log(req.body)
  console.log("la data:", data)
  try {
    const usuario = await Usuario.getUsuario(data.user);
    console.log(usuario, data)
    if (!usuario) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
    const contraseniaValida = await encrypt.verificarContrasenia(data.password, usuario.CONTRASENA);
    if (!contraseniaValida) {
      return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }
    let alumno = await Alumno.getId(usuario.CARNE_ALUMNO);
    alumno = alumno[0][0]
    console.log(alumno)
    const payload = {
      nombre_usuario: usuario.NOMBRE_USUARIO,
      carne_alumno: usuario.CARNE_ALUMNO,
      is_admin: usuario.IS_ADMIN,
      Nombre: alumno.Nombre,
      direccion: alumno.direccion,
      telefono: alumno.telefono,
      FecNac: alumno.FecNac,
      correo: alumno.correo
    };
    console.log(payload)
    const token = JWT.generarToken(payload)
    res.json({ mensaje: 'Inicio de sesión exitoso', token: token , code:1, payload});
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
  }
}


const get = async (req,res) => {
  try {
      const datos = await Usuario.get()
      console.log(datos[0])
      res.status(200).json({datos, code:1})
  } catch (error) {
      res.status(500).json({error})
  }
}

const post = async (req,res) => {
  try {
      const data = req.body.data
      data.contrasena = await encrypt.generarHash(data.contrasena)
      const datos = await Usuario.add(data)
      res.status(200).json({datos, code:1})
  } catch (error) {
      res.status(500).json({error})
  }
}
const update = async (req,res) => {
  try {
      const data = req.body.data
      const datos = await Usuario.update(data)
      res.status(200).json({datos, code:1})
  } catch (error) {
      res.status(500).json({error})
  }
}

const del = async (req,res) => {
  try {
      const carne = req.params.carne
      const datos = await Usuario.del(carne)
      res.status(200).json({datos, code:1})
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
