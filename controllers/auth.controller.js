const bcrypt = require('bcrypt');
const { usuario, rol, Sequelize } = require('../models');
const { GeneraToken, TiempoRestanteToken } = require('../services/jwttoken.service');

let self = {}

// POST: api/auth
self.login = async function(req, res) {
    try {
        const { email, password } = req.body;

        let data = await usuario.findOne({
            where: {
                email: email
            },
            raw: true,
            attributes: ['id', 'email', 'nombre', 'passwordhash', [Sequelize.col('rol.nombre'), 'rol']],
            include: {
                model: rol,
                attributes: []
            }
        })

        if (!data) 
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        
        // Se compara la contraseña con el hash almacenado
        const passwordMatch = await bcrypt.compare(password, data.passwordhash);
        if (!passwordMatch)
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        
        // Utilizamos los nombres de Claims estándar
        const token = GeneraToken(data.email, data.nombre, data.rol);
    
        return res.status(200).json({
            email: data.email,
            nombre: data.nombre,
            rol: data.rol,
            jwt: token
        });
    } catch (error) {
        console.error("Error en la autenticación:", error);
        return res.status(500).json({ message: 'Error en la autenticación' });
    }
}

// GET: api/auth/tiempo
self.tiempo = async function(req, res) {
    try {
        const tiempo = TiempoRestanteToken(req);
        if (tiempo === null)
            return res.status(404).send();
        
        return res.status(200).send(tiempo);
    } catch (error) {
        console.error("Error al obtener el tiempo restante del token:", error);
        return res.status(500).json({ message: 'Error al obtener el tiempo restante del token' });
    }
}

module.exports = self;
