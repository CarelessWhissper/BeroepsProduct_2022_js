var USerdb = require('../model/model');

//create and save new user

exports.create= (request,responds) =>{

    //validate request

    if(!request.body) {
        responds.status(400).send({message:"Content can not be empty!"});
        return;
    }

    //create new instance of the user

    const user = new USerdb({
        name: request.body.name,
        email: request.body.email,
        insurance: request.body.insurance,
        status: request.body.status,
        doctor: request.body.doctor
    })

    //save user in the mongoDB 
    user
        .save(user)
        .then(data=>{
            responds.redirect('/add-user');
        })
        .catch(err=>{
            responds.status(500).send({
                message:err.message|| "Some error occured while a creating a create operation"
            });
        });

}


//retrieve and return all users/ retrieve and a return a single user

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        USerdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "enable to find user with the id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error in retrieving user with the id " + id})
            })

    }else{
        USerdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

//update a new identified user by user id

exports.update = (request, responds) =>{
            
    if(!request.body) {
        return responds
              .status(400)
              .send({message: "Data to update can not be empty"});
               
    }
       const id = request.params.id;
       USerdb.findByIdAndUpdate(id,request.body,{useFindAndModify:false})
             .then(data=>{
                 if(!data) {
                     responds.status(404).send({message:`Cannot update user with ${id}.Maybe user not found`})
                 }else{
                     responds.send(data)
                 }
             })

             .catch(err=>{
                 responds.status(500).send({message:"Error updating user information"})
             })
}


//delete a user with specified user id in the request

exports.delete = (request,reponds)=>{
   const id = request.params.id;

   USerdb.findByIdAndDelete(id)
         .then(data=>{
             if(!data) {
                 reponds.status(404)
             }else{
                 reponds.send({
                     message: "User was deleted successfully"
                 })
             }
         })
         .catch(err=>{
             reponds.status(500).send({
                 message:"Could not delete User with id= " + id
             });
         });
}
