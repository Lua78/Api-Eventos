const router = require('express').Router()
const controller = require('../Controllers/UsuariosController')
const adminMiddleware = require('../Middlewares/AdminMiddleware')


router.get('/', adminMiddleware, controller.get)
router.post('/', adminMiddleware, controller.post)
router.put('/', adminMiddleware, controller.update)
router.delete('/:carne', adminMiddleware, controller.del)
router.post('/login',controller.login)

module.exports = router