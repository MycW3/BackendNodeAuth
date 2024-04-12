const router = require('express').Router();
const categorias = require('../controllers/categorias.controller')

//GET: api/categorias
router.get('/', categorias.getAll);

//GET: api/categorias/5
router.get('/:id', categorias.get);

//POST: api/categorias
router.post('/', categorias.create);

//PUT: api/categorias/5
router.put('/:id', categorias.update);

//DELETE: api/categorias/5
router.delete('/:id', categorias.delete);

module.exports = router;