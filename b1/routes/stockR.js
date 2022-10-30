const express = require('express')
const SBank = require('../models/stock-model')
const {
    createS,
    getS,
    delS,
    putS
} = require('../controller/stock-controller')

const router = express.Router()

// test
router.get('/', (req, res) => {
    res.json({mssg: 'hello world'})
})

// get stock
router.get('/1', getS)

// post stock
router.post('/', createS)

// put stock
router.patch('/:id', putS)

// delete stock
router.delete('/:id', delS)

module.exports = router