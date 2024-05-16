const  express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.APP_PORT ?? 4000
const router = require('./src/Routes/indexRouter.js')
const authMiddleware = require('./src/Middlewares/Auth.js')
const cors = require('cors')

app.use(cors())

app.use(express.json());

app.use(authMiddleware)

app.use('/api', router)

app.listen(port, ()=>{
    console.log('app escuchando en el puerto ', port)
})