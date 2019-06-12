const express = require('express')
const router = express.Router()

const caloriesController = require('../controllers/calories')

router.get('/', caloriesController.index)
router.post('/', caloriesController.create)
router.get('/:id', caloriesController.show)
router.patch('/:id', caloriesController.update)
router.delete('/:id', caloriesController.delete)

module.exports = router;