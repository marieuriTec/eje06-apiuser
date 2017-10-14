const router = require('express').Router();
const handler = require('../utils/handler');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/unidad2', {
  useMongoClient: true
});

const User = require('../models/user.model');

module.exports = () => {

    router.get('/', (req, res) => {
        User.find({})
        .sort()
        .exec(handler.handleMany.bind(null, 'users', res));
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        User.find({_id:id})
        .sort()
        .exec(handler.handleOne.bind(null, 'users', res));
    });
    //EJERCICIO CONSULTA POR NOMBRE
    router.get('/name/:name', (req, res) => {
        const name = req.params.name;
        User.find({name:name})
        .sort()
        .exec(handler.handleOne.bind(null, 'users', res));
    });
    //
    //EJERCICIO CONSULTA POR EMAIL
    router.get('/email/:email', (req, res) => {
        const email = req.params.email;
        User.find({email:email})
        .sort()
        .exec(handler.handleOne.bind(null, 'users', res));
    });
    //MÉTODOS PARA INSERTAR


    router.post('/', (req, res) => {
        //Recibir los parámetros

        const usuario= req.body;
        User.create()
            .then(
                function(data){
                    console.log(data);
                    res.json(data);
                }
            )
            .catch(
                function (err) {
                    console.log(err);
                    res.status(400);
                    res.json({err:err});
                }
            );
        
    });

    //
    //MÉTODO ELIMINAR
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        User.remove({_id:id}, function(err,data) {
           if(err){
               console.log(err);
               res.status(400);
               res.json({err,err})
           } else{
               res.json({msj:"Se ha eliminado el documento correctamente."});
           }
        });

        
       
    });
    return router;
}