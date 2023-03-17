const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
const app = express()
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') // 將 request 導入路由器

const PORT = process.env.PORT || 3000 // 連結到heroku或是連到3000

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false, // 當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true // 強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))

app.use(express.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user // res.locals 是 Express.js 幫我們開的一條捷徑，放在 res.locals 裡的資料，所有的 view 都可以存取。
  next()
})
app.use(routes)


app.listen(PORT, ()=>{
  console.log(`App is running on http://localhost:${PORT}`)
})