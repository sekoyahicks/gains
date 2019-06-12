const express = require('express')
const router = express.Router()

const weightController = require('../controllers/weight')

router.get('/', weightController.index)
router.post('/', weightController.create)
router.get('/:id', weightController.show)
router.patch('/:id', weightController.update)
router.delete('/:id', weightController.delete)

module.exports = router;