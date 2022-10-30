require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const sRoutes = require('./routes/stockR')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/stocks', sRoutes)

// connect db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = app;
