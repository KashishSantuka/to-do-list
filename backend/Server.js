const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const routes = require('./routes/toDoRoute')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.port || 5000

mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log(`Connected To MongoDB...`))
.catch((err) => console.log(err))

app.use('/todo', routes)

app.listen(PORT, () => console.log(`Listening on: ${PORT}`))


