const Data = require('../Data/dataEventosCarreras');


const get = async (req,res) => {
    try {
        const data = req.body.data
        const datos = await Data.get(data)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getId = async (req,res) => {
    try {
        const data = req.body.data
        const datos = await Data.getId(data)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}
const post = async (req,res) => {
    try {
        const data = req.body.data
        const datos = await Data.add(data)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}

const del = async (req,res) => {
    try {
        const data = req.params.id
        const datos = await Data.del(id)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    get,
    getId,
    post,
    del
}