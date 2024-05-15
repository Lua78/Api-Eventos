const router = require('express').Router()
const controller = require('../Controllers/UsuariosController')

router.get('/',controller.get)
router.post('/',controller.post)
router.put('/',controller.update)
router.delete('/:carne',controller.del)
router.post('/login',controller.login)

module.exports = router