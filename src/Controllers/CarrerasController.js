const Data = require('../Data/dataCarreras');


const get = async (req,res) => {
    try {
        const datos = await Data.get()
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
const update = async (req,res) => {
    try {
        const data = req.body.data
        const datos = await Data.update(data)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}

const del = async (req,res) => {
    try {
        const id = req.params.id
        const datos = await Data.del(id)
        res.status(200).json({datos})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    get,
    post,
    update,
    del
}