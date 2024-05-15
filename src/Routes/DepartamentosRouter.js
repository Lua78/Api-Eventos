const router = require('express').Router()
const controller = require('../Controllers/DepartamentosController')

router.get('/',controller.get)
router.post('/',controller.post)
router.put('/',controller.update)
router.delete('/:id',controller.del)


module.exports = router