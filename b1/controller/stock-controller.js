const { default: mongoose } = require('mongoose')
const SBank = require('../models/stock-model')

// get stock
const getS = async (req, res) => {
    const q = await SBank.aggregate([
        { $sample: { size: 1}}
    ])
    res.status(200).json(q)
}

// create stock
const createS = async (req, res) => {
    const {ticker, entry, quantity} = req.body

    try {
        const q = await SBank.create({ticker, entry, quantity})
        res.status(200).json(q)
    } 
    catch (error) { res.status(400).json({error: error.message}) }
}

// delete stock
const delS = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such stock"})
    }

    const stock = await SBank.findOneAndDelete({_id: id})

    if(!stock) { return res.status(400).json({error: 'no such stock'}) }

    res.status(200).json(stock)
}

// update stock
const putS = async (req, res) => {
    const { id } = req.params

    console.log(req.body)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such stock"})
    }

    const stock = await SBank.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    const s = await SBank.findById(id)

    if(!stock) { return res.status(400).json({error: 'no such stock'}) }

    res.status(200).json(s)
}

module.exports = {
    getS, 
    createS,
    delS,
    putS
}