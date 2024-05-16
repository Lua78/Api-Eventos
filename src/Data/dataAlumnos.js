const executeQuery = require('../config/DBConexion');


const add = async (data)=>{
    const query = 'CALL sp_crearAlumno(?,?,?,?,?,?)';
    console.log(data)
    const params = [data.carne, data.nombre, data.direccion, data.telefono, data.fecha_nacimiento, data.correo];
    return await executeQuery(query, params);
}

const get = async ()=>{
    const query = 'CALL sp_obtenerAlumnosActivos()';
    return await executeQuery(query);
}

const getId = async (carne)=>{
    const query = 'CALL sp_obtenerAlumnoActivoPorCarne(?)';
    const params = [carne];
    return await executeQuery(query, params);
}


const update = async (data)=>{
    const query = 'CALL sp_actualizarAlumno(?,?,?,?,?,?)';
    const params = [data.carne, data.nombre, data.direccion, data.telefono, data.fecha_nacimiento, data.correo];
    return await executeQuery(query, params);
}
const del = async (id)=>{
    const query = 'CALL sp_eliminarAlumnoLogico(?)';
    const params = [id];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    getId,
    get,
    update,
    del
}