
function isAdmin(req, res, next) {
    if (req.payload && req.payload.is_admin == 1) {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
    }
}

module.exports = isAdmin;
