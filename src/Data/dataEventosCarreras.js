const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    const query = 'CALL sp_crearRelacionEventoCarrera(?,?)';
    const params = [data.id_evento, data.id_carrera];
    return await executeQuery(query, params);
}

const get = async (id)=>{
    const query = 'CALL sp_obtenerRelacionesActivasEventoCarreraPorCarrera(?)';
    const params = [id];
    return await executeQuery(query, params);
}

const getId = async (id)=>{
    const query = 'CALL sp_obtenerEventoActivoPorID(?)';
    const params = [id];
    return await executeQuery(query, params);
}

const del = async (id)=>{
    const query = 'CALL sp_borrarRelacionesActivasEventoCarreraPorEvento(?)';
    const params = [id];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    get,
    getId,
    del
}