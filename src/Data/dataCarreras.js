const executeQuery = require('../config/DBConexion');

const add = async (data) => {
    const query = 'CALL sp_crearCarrera(?, ?)';
    const params = [data.Nombre, data.idDepartamento];
    return await executeQuery(query, params);
};

const get = async () => {
    const query = 'CALL sp_obtenerCarreras()';
    return await executeQuery(query);
};

const update = async (data) => {
    const query = 'CALL sp_actualizarCarrera(?, ?, ?)';
    const params = [data.idCarrera, data.Nombre, data.idDepartamento];
    return await executeQuery(query, params);
};

const del = async (id) => {
    const query = 'CALL sp_eliminarCarreraLogico(?)';
    return await executeQuery(query, [id]);
};

module.exports = {
    add,
    get,
    update,
    del
};
