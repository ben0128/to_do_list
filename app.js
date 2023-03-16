const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') // 將 request 導入路由器

const PORT = process.env.PORT || 3000 // 連結到heroku或是連到3000

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.use(express.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes)


app.listen(PORT, ()=>{
  console.log(`App is running on http://localhost:${PORT}`)
})