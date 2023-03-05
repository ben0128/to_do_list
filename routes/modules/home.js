const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()  // 把所有資料拿出來，也可以在括號加上想查詢的資料
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //desc
    .then(todos => res.render('index', { todos }))  // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// 匯出路由模組
module.exports = router