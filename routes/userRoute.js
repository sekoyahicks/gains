const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/', userController.index)
router.post('/', userController.create)
router.get('/:id', userController.show)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)
router.post('/login', userController.login)

module.exports = router;