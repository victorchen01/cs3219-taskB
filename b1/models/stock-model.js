const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
    ticker: {
        type: String,
        required: true
    },
    entry: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('SBank', stockSchema)