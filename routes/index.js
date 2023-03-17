// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos') // 引入 todos 模組程式碼
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router