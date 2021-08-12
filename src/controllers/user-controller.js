const db = require("../models");
const { generateTokken } = require("../services/auth/generate-tokken")
//const jwt = require('jsonwebtoken');
//const  config  = require("../config");
const { sessionData } = require("../session/session");
const randTokken = require("rand-token");



async function register(req,res){
    
    const {firstName,lastName,email, password}=req.body;
    try{
    
    const{_id} = await db.User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:await db.User.encryptPassword(password),
    });



    return res.status(200).send({
        message:"user created",
        data:{
            id:_id
        }
    })
    }catch(err){
        return res.status(500).send({
            error:err.message,
        })
    }

}

async function refreshTokken(req, res, next){
    const { email,refreshTokken }=req.body;
    try{
        if(refreshTokken in sessionData.refreshTokens && 
            sessionData.refreshTokens[refreshTokken]===email
            ){
            const accessTokken = generateTokken({email:email});
            return res.status(200).send({
                accessTokken:accessTokken,
                refreshTokken:refreshTokken,
                message:`Welcome ${email}`,
            })
        }
    }catch(err){
        return res.status(401).send({
            error:err,
        })
    }
}

async function login(req,res){
    const {email, password}=req.body;
    try{
        const userFound = await db.User.findOne({email:email});
        const matchPassword = await db.User.comparePassword(password,userFound.password);
        if(userFound) {
            if(matchPassword){
                const accessTokken = generateTokken({email:email});
                const refreshTokken= randTokken.generate(256);

                sessionData.refreshTokens[refreshTokken]=userFound.email;
                return res.status(200).send({
                    accessTokken:accessTokken,
                    refreshTokken:refreshTokken,
                    message:`Welcome ${userFound.firstName}`,
                });
            }else{
                return res.status(400).send(`The password doesn't match`);
            }
            
        }else{
            return res.status(400).send(`The user not exist`);
        }
        
    }catch(err){
        return res.status(500).send({
            error:err.message,
        })
    }
    
}

async function getUsers(req,res){
    try{
    const users = await db.User.find({});

    return res.status(200).send({
        message:"user found",
        data:users,
       
    })
    }catch(err){
        return res.status(500).send({
            error:err.message,
        })
    }

};

async function getUser(req,res){
    try{
        const userGetted = await db.User.findById(req.params.id);
       
        return res.status(200).send({
                user:userGetted,
            })
       
        
    }catch(err){
        return res.status(500).send({
            error:err,
        })
    }
};
// ,function (err) {
//     if (err) return handleError(err)}

async function delete_user(req, res){
    try{
         await db.User.deleteOne({_id:req.params.id});
       
            return res.status(200).send({
                message:`The user  had been deleted`,
            })    
    }catch(err){
        return res.status(500).send({
            error:err,
        })
    }
};
async function update_user(req,res){
    console.log("update in");
    try{
         await db.User.updateOne({_id:req.params.id}, req.body, {new:true});
       
            return res.status(200).send({
                message:`The user ${req.body.firstName} had been changed`,
            })    
    }catch(err){
        console.log("estoy en el error");
        return res.status(500).send({
            error:err,
        })
    }
};

module.exports={
    register:register,
    login:login,
    getUsers:getUsers,
    getUser:getUser,
    delete_user:delete_user,
    update_user:update_user,
    refreshTokken:refreshTokken
}