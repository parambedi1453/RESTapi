
// this will load all environment variables in the server from .env file
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } )

const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open', () => console.log('connected to database'))


// settting our server to accept JSON
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)
//look like this 'localhost:3000/subscribers/

app.listen(3000, () => console.log('\nserver is running'))