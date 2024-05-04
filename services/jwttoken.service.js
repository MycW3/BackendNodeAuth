const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const ClaimTypes = require('../config/claimtypes');

const GeneraToken = (email, nombre, rol) => {
//utilizamos los nombre de Claims estandar
    const token = jwt.sign({
        [ClaimTypes.Name]: email,
        [ClaimTypes.GivenName]: nombre,
        [ClaimTypes.Role]: rol,
        "iss": "ServidorFeiJWT",
        "aud": "ClienteFeiJWT"
    }, 
        jwtSecret, { 
        expiresIn: '20m', //20 minutos
     })
     return token;

}

const TiempoRestanteToken = (req) => {
    try {
        const authHeader = req.headers('Authorization')
        if (!authHeader.startsWith('Bearer')) 
            return null

        //obtiene el token de la solicitud
        const token = authHeader.split(' ')[1]
        //verifica el token, si no es valido envia error y sakta al catch
        const decodedToken = jwt.verify(token, jwtSecret)

        //Regresa el tiempo restante en minutos
        const time = (decodedToken.exp - (new Date().getTime() / 1000))
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time - (minutes * 60))
        return "00:" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
    }catch(error){
        return null
    }
}

module.exports = { GeneraToken, TiempoRestanteToken };