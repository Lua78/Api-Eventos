
const executeQuery = require('../config/DBConexion')

const add = async (data) => {
    const query = 'CALL sp_crearCategoria(?)';
    const params = [data.nombre];
    return await executeQuery(query, params);
}

const get = async () => {
    const query = 'CALL sp_obtenerCategorias()';
    return await executeQuery(query);
};

const update = async (data) => {
    const query = 'CALL sp_actualizarcategoria(?,?)';
    const params = [data.id, data.nombre];
    return await executeQuery(query, params);
}
const del = async (id) => {
    const query = 'CALL sp_eliminarCategoriaLogico(?)';
    const params = [id];
    return await executeQuery(query, params);
}




module.exports = {
    add,
    get,
    update,
    del
}