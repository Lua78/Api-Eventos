const Data = require('../Data/dataCarreraEst');


const get = async (req,res) => {
    try {
        const carne = req.params.carne
        let datos = await Data.get(carne)
        datos = datos[0]
        res.status(200).json({datos, code:1})
    } catch (error) {
        res.status(500).json({error})
    }
}

const postCarrera = async (req,res) => {
    try {
        const carrera = req.body.carrera
        const datos = await Data.getIdCarrera(carrera)
        res.status(200).json({datos, code:1})
    } catch (error) {
        res.status(500).json({error})
    }
}
const post = async (req,res) => {
    try {
        const data = req.body
        const datos = await Data.add(data)
        res.status(200).json({datos, code:1})
    } catch (error) {
        res.status(500).json({error})
    }
}
const update = async (req,res) => {
    try {
        const data = req.body
        const datos = await Data.update(data)
        res.status(200).json({datos, code:1})
    } catch (error) {
        res.status(500).json({error})
    }
}
const del = async (req,res) => {
    try {
        const data = req.params.id
        const datos = await Data.del(id)
        res.status(200).json({datos, code:1})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    get,
    postCarrera,
    post,
    del,
    update
}