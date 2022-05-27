const dotenv = require('dotenv').config()
const express = require('express')
const { urlencoded } = require('body-parser')
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()
const port = process.env.PORT || 6000


app.use(express.json())
app.use(urlencoded({extended:false}))



app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})

