const todoCtrl = require('../controllers/todoController.js')
const express = require('express')
const router = express.Router()

// INDUCES dont use N or E when your making an API \\
router.get('/', todoCtrl.index)
router.post('/', todoCtrl.create)
router.put('/:id', todoCtrl.update)
router.delete('/:id', todoCtrl.destroy)
router.get('/:id', todoCtrl.show)

module.exports = router