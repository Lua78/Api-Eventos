const  express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.APP_PORT ?? 4000

app.listen(port, ()=>{
    console.log('app escuchando en el puerto ', port)
})