const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    const query = 'CALL sp_crearEvento(?,?,?,?,?,?)';
    const params = [data.titulo, data.descripcion, data.fecha_inicio, data.fecha_fin, data.id_categoria, data.imagen];
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
    const query = 'sp_actualizarEvento(?,?,?,?,?,?,?)';
    const params = [data.id, data.titulo, data,descripcion, data.fecha_inicio, data.fecha_fin, data.id_categoria, data.imagen];
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