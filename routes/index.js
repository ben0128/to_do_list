// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos') // 引入 todos 模組程式碼

router.use('/', home)

router.use('/todos', todos) // 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 

// 準備引入路由模組
// 匯出路由器
module.exports = router