const db = require("../models");
const {Persons} = db;

async function addActors(req,res){
    const{
        Name,
        Date_birth,
        Place_birth,
        Caracters
    }=req.body;

    try{
        const {_id} = await Persons.actors.create({
            Name:Name,
            Date_birth:Date_birth,
            Place_birth:Place_birth,
            Caracters:Caracters
        });
        return res.status(200).send({
            message:"A new actor has been created"
        });
    }catch(err){
        return res.status(500).send({
            error:err
        })
    }
}

async function addWorkers(req,res){
    const{
        Name,
        Date_birth,
        Place_birth,
        Role
    }=req.body;

    try{
        const {_id} = await Persons.workers.create({
            Name:Name,
            Date_birth:Date_birth,
            Place_birth:Place_birth,
            Role:Role
        })
        return res.status(200).send({
            message:"A new worker has been created"
        })
    }catch(err){
        return res.status(500).send({
            error:err
        })
    }
}

module.exports={
    addActors:addActors,
    addWorkers:addWorkers
}