const { categoria } = require('../models');
let self = {}

//GET: api/categorias
self.getAll = async function(req, res) {
    try{
        let data = await categoria.findAll({ attributes: [['id', 'categoriaId'] , 'nombre', 'protegida']});
        return res.status(200).json(data)
    }catch(error){
        return res.status(500).json(error)
    }
}

//GET: api/categorias/5
self.get = async function(req, res) {
    try{
        let id = req.params.id;
        let data = await categoria.findByPk(id, { attributes: [['id', 'categoriaId'] , 'nombre', 'protegida']});
        if(data)
        return res.status(200).json(data)
        else
        return res.status(404).send()
    }catch(error){
        return res.status(500).json(error)
    }
}

//POST: api/categorias
self.create = async function(req, res) {
    try{
        let data = await categoria.create({
            nombre:req.body.nombre
        })
        return res.status(201).json(data)
    }catch (error){
        return res.status(500).json(error)
    }
}

//PUT: api/categorias/5
self.update = async function(req, res) {
    try {
        let id =  req.params.id;
        let body = req.body;
        let data = await categoria.update(body, {where: {id: id}});
        if (data[0] === 0)
        return res.status(404).send()
        else
        return res.status(204).send()
    }catch(error){
        return res.status(500).json(error)
    }
}

//DELETE: api/categorias/5
self.delete = async function(req, res) {
    try{
        let id = req.params.id;
        let data = await categoria.findByPk(id);
        if (!data)
        return res.status(404).send()
    //no se pueden eliminar categorias protegidas
    if (data.protegida)
    return res.status(400).send()

    data = await categoria.destroy({where: {id: id}});
    if (data === 1)
    return res.status(204).send()
    else
    return res.status(404).send()
    }catch(error){
        return res.status(500).json(error)
    }
}
module.exports = self;