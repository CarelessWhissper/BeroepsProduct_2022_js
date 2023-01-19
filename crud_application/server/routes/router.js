const express = require('express');

const route = express.Router()


//separate the call back functions so dat i can maintain it.

const services = require('../services/render');
const controller= require('../controller/controller');

/**
 * @description Root Route(homepage)
 * @method GET / 
 */

route.get('/',services.homeRoutes);


/**
 * @description adds new patients to the table
 * @method GET /add-user
 */
route.get('/add-user',services.add_user);

/**
 * @description route for updating patient information
 * @method GET /update-user
 */

route.get('/update-user',services.update_user);


//create api route

route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

// route.get('/',(request,responds)=>{
//     responds.render('index');
// })

// route.get('/add-user',(request,responds)=>{
//     responds.render('add_user');
// })

// route.get('/update-user',(request,responds)=>{
//     responds.render('update_user');
// })  

module.exports= route