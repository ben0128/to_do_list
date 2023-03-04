const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const Todo = require('./models/todo')
const bodyParser = require('body-parser') // 引用 body-parser
const app = express()

mongoose.connect('mongodb+srv://alpha:camp@cluster0.dgxufmq.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

//加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req, res) => {
  Todo.find()  // 把所有資料拿出來，也可以在括號加上想查詢的資料
    .lean()  // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //desc
    .then(todos => res.render('index', { todos }))  // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//讓使用者可以增加新事件
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

//接住表單資料，並從表單內拿出名字的資料，傳入資料庫
app.post('/todos', (req, res) => {
  const name = req.body.name
  
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))        
})

//瀏覽單筆todo的細節
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo)=>res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//進入編輯todo的畫面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//更新一筆todo
app.post('/todos/:id/edit',(req, res) => {
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
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, ()=>{
  console.log('App is running on http://localhost:3000')
})