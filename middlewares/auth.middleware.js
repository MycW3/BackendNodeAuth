const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const ClaimTypes = require('../config/claimtypes');
const { GeneraToken }= require('../services/jwttoken.service');

const Authorize = (rol) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization');
            if (!authHeader.startsWith('Bearer'))
                return res.status(401).json()

            //obtiene el token de la solicitud
            const token = authHeader.split(' ')[1]
            //verifica el token, si no es valido envia error y sakta al catch
            const decodedToken = jwt.verify(token, jwtSecret)

            ///verifica si el rol esta autorizado
            if (minutosRestantes < 5){
                var nuevoToken = GeneraToken(decodedToken[ClaimTypes.Name], decodedToken[ClaimTypes.GivenName], decodedToken[ClaimTypes.Role])
                    res.header("Set-Authorization", nuevoToken)
                }
                //continua con el metodo
                next()
            }catch(error){
                return res.status(401).json()
        }
    }
}

module.exports = Authorize;