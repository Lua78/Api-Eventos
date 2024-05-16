const router = require('express').Router()
const controller = require('../Controllers/AlumnosController')
const adminMiddleware = require('../Middlewares/AdminMiddleware')


router.get('/', adminMiddleware, controller.get)
router.post('/', adminMiddleware, controller.post)
router.put('/', adminMiddleware, controller.update)
router.delete('/:id', adminMiddleware, controller.del)


module.exports = router