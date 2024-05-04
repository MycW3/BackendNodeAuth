const router = require('express').Router();
const peliculas = require('../controllers/peliculas.controller')
const Authorize = require('../middlewares/auth.middleware');

//GET: api/peliculas
router.get('/', Authorize('Usuario, Administrador'), peliculas.getAll);

//GET: api/peliculas/5
router.get('/:id',Authorize('Usuario, Administrador'), peliculas.get);

//POST: api/peliculas
router.post('/', Authorize('Administrador'), peliculas.create);

//PUT: api/peliculas/5
router.put('/:id',Authorize(' Administrador'), peliculas.update);

//DELETE: api/peliculas/5
router.delete('/:id',Authorize('Administrador'), peliculas.delete);

//POST: api/peliculas/5/categorias
router.post('/:id/categorias', Authorize('Administrador'), peliculas.asignaCategoria);

//DELETE: api/peliculas/5/categorias
router.delete('/:id/categorias/:idcategria',Authorize('Administrador'), peliculas.eliminaCategoria);

module.exports = router;