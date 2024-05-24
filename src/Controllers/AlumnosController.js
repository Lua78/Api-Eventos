const Data = require('../Data/dataAlumnos');


const get = async (req,res) => {
    try {
        let datos = await Data.get()
        datos = datos[0]
        res.status(200).json({datos, code:1})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
const getId = async (req,res) => {
    try {
        const datos = await Data.get()
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
        let datos = await Data.update(data)
        console.log("Datos recibidos, ", datos, data)
        res.status(200).json({datos, code:1})
    } catch (error) {
        console.log(error) 
        res.status(500).json({error})
    }
}

const del = async (req,res) => {
    try {
        const id = req.params.id
        const datos = await Data.del(id)
        res.status(200).json({datos, code:1})
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