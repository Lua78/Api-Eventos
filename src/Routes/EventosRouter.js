const router = require('express').Router()
const controller = require('../Controllers/EventosController')

router.get('/',controller.get)
router.get('/:id',controller.getId)
router.post('/',controller.post)
router.put('/',controller.update)
router.delete('/:id',controller.del)


module.exports = router