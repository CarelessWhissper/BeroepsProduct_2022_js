// render different files using router

const axios = require('axios');

exports.homeRoutes = (request, responds) =>{
    //make a GET-request to /api/users

    axios.get('http://localhost:3000/api/users')
         .then(function(response){
            responds.render('index',{users:response.data});
           
         })
         .catch(err=>{
             responds.send(err)
         })
    
    
}

exports.add_user = (request, responds)=>{
    responds.render('add_user');

}

exports.update_user = (request, responds)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:request.query.id}})
         .then(function(userData){
             responds.render("update_user",{user:userData.data})
         })
         .catch(err=>{
             responds.send(err);
         })
         

    
   
}

