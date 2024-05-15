const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    const params = [data.carne, data.usuario, data.contrasena, admin];
    return await executeQuery(query, params);
}

const get = async ()=>{
    const query = 'CALL sp_obtenerUsuarios()';
    return await executeQuery(query);
}

const getUsuario = async (nombreUsuario) => {
    try {
        const query = 'CALL sp_buscarUsuarioPorNombre(?)';
        const params = [nombreUsuario];
        const usuarios = await executeQuery(query, params);
        if (usuarios.length > 0) {
            return usuarios[0];
        } else {
            return undefined;
        }
    } catch (error) {
        throw error;
    }
};

const update = async (data)=>{
    const query = 'sp_modificarUsuario(?,?,?,?)';
    const params = [data.carne, data.usuario, data.contrasena, admin];
    return await executeQuery(query, params);
}
const del = async (carne)=>{
    const query = 'CALL sp_inhabilitarUsuario(?)';
    const params = [carne];
    return await executeQuery(query, params);
}

module.exports = {
    add,
    get,
    getUsuario,
    update,
    del
}