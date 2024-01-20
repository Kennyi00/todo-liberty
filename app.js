const express = require ('express')
const app = express()
const todoRouter = require('./routes/todoRouter')

//middleware
app.use(express.json()) //bodyParser middleware for json api's
app.use('/todos', todoRouter)

module.exports = app


