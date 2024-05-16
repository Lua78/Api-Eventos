const router = require('express').Router()
const controller = require('../Controllers/EventosController')
const adminMiddleware = require('../Middlewares/AdminMiddleware')

router.get('/', adminMiddleware, controller.get)
router.get('/:id', controller.getId)
router.post('/', adminMiddleware, controller.post)
router.put('/', adminMiddleware, controller.update)
router.delete('/:id', adminMiddleware, controller.del)


module.exports = router