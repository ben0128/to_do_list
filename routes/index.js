const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos') // 引入 todos 模組程式碼
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos)
router.use('/auth', auth)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router