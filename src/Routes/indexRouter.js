const router = require('express').Router()
const departamentos = require('./DepartamentosRouter')
const categorias = require('./CategoriaRouter')
const alumnos = require('./AlumnosRouter')
const carreras = require('./CarrerasRouter')
const eventos = require('./EventosRouter')
const usuarios = require('./UsuariosRouter')


router.use('/departamentos',departamentos)
router.use('/categorias',categorias)
router.use('/alumnos',alumnos)
router.use('/carreras',carreras)
router.use('/eventos',eventos)
router.use('/usuarios', usuarios)

module.exports = router