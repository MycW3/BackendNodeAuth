const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const app = express()

//Swagger
app.use(cors())
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')    

//Primero carga la configuración del archivo .env. para que este disponible en las demás llamadas
dotenv.config();

//se requiere para entender los datos recibidos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//RUTAS
app.use("/api/categorias", require('./routes/categorias.routes'));
app.use("/api/peliculas", require('./routes/peliculas.routes'));
app.use("/api/usuarios", require('./routes/usuarios.routes'));
app.use("/api/roles", require('./routes/roles.routes'));
app.use("/api/auth", require('./routes/auth.routes'));
app.get('*', (req, res) => { res.status(404).send() });

//Middleware para el manejo de errores
const errorHandler = require('./middlewares/errorhandler');

app.use(errorHandler);

//Inicia el servidor web en el puerto SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(` Aplicación de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
})