const executeQuery = require('../config/DBConexion');

const add = async (data)=>{
    try {
        const query = 'CALL sp_crearUsuario(?,?,?,?)';
        const params = [data.carne, data.usuario, data.contrasena, data.admin];
        return await executeQuery(query, params);
    } catch (error) {
        console.log(error)
    }
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
        if (usuarios[0].length > 0) {
            return usuarios[0][0];
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