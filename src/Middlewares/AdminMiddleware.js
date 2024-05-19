
function isAdmin(req, res, next) {
    if (req.payload && req.payload.is_admin.data == 1) {
        console.log("Autorizado")
        next();
    } else {
        console.log("No admin", req.payload)
        res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
    }
}

module.exports = isAdmin;
