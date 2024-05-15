const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    const query = 'CALL sp_crearRelacionCarreraEst(?,?,?)';
    const params = [data.id_carrera, data.carne, data.fecha_ingreso];
    return await executeQuery(query, params);
}

const get = async (carne)=>{
    const query = 'CALL sp_obtenerRelacionesActivasCarreraEstudiantesPorCarne(?)';
    const params = [carne];
    return await executeQuery(query);
}

const getIdCarrera = async (id)=>{
    const query = 'CALL sp_obtenerRelacionesActivasCarreraEstudiantesPorCarrea(?)';
    const params = [id];
    return await executeQuery(query, params);
}
const update = async (data)=>{
    const query = 'sp_actualizarRelacionCarreraEst(?,?,?)';
    const params = [data.id_carrera, data.carne, data.fecha_ingreso];
    return await executeQuery(query, params);
}
const del = async (id)=>{
    const query = 'CALL sp_eliminarRelacionCarreraEstLogico(?)';
    const params = [id];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    get,
    getIdCarrera,
    update,
    del
}