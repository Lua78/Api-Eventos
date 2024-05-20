const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    const query = 'CALL sp_crearEvento(?,?,?,?,?,?)';
    const params = [data.Titulo, data.Descripcion, data.fechainicio, data.FechaFin, data.idCategoria, data.imagen];
    return await executeQuery(query, params);
}

const get = async ()=>{
    const query = 'CALL sp_obtenerEventosActivos()';
    return await executeQuery(query);
}

const getId = async (id)=>{
    const query = 'CALL sp_obtenerEventoActivoPorID(?)';
    const params = [id];
    return await executeQuery(query, params);
}
const update = async (data)=>{
    const query = 'CALL sp_actualizarEvento(?,?,?,?,?,?,?)';
    const params = [data.idEvento, data.Titulo, data.Descripcion, data.fechainicio, data.FechaFin, data.idCategoria, data.imagen];
    return await executeQuery(query, params);
}
const del = async (id)=>{
    const query = 'CALL sp_eliminarEventoLogico(?)';
    const params = [id];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    get,
    getId,
    update,
    del
}