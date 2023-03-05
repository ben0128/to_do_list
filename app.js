const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser') // 引用 body-parser
const app = express()
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') // 將 request 導入路由器

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


app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes)


app.listen(3000, ()=>{
  console.log('App is running on http://localhost:3000')
})