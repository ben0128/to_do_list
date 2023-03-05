const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//讓使用者可以增加新事件
router.get('/new', (req, res) => {
  return res.render('new')
})

//接住表單資料，並從表單內拿出名字的資料，傳入資料庫
router.post('/', (req, res) => {
  const name = req.body.name
  
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))        
})

//瀏覽單筆todo的細節
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//進入編輯todo的畫面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//更新一筆todo
router.put('/:id',(req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//刪除一筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

