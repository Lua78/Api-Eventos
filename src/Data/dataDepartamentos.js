const executeQuery = require('../config/DBConexion')

const add = async (data) => {
    const query = 'CALL sp_crearDepartamento(?)';
    const params = [data.Nombre];
    return await executeQuery(query, params);
}

const get = async () => {
    const query = 'CALL sp_obtenerDepartamentos()';
    return await executeQuery(query);
};

const update = async (data) => {
    const query = 'CALL sp_actualizarDepartamento(?,?)';
    const params = [data.idDepartamento, data.Nombre];
    return await executeQuery(query, params);
}
const del = async (id) => {
    const query = 'CALL sp_eliminarDepartamentoLogico(?)';
    const params = [id];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    get,
    update,
    del
}