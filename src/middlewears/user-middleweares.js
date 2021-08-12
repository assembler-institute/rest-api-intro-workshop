const db = require("../models");
async function userExistsMiddleweare(req,res,next){
    try{
        const { email } = req.body;
        const userExist=db.User.find({email:email});
        if(!userExist){
    
            next();

        }else{
            return res.status(200).send("The user already exist");
        }
    }catch(err){
        return res.status(500).send({
            error:err
        })
    }
}

async function userNotExistsMiddleweare(req,res,next){
    const userGetted = await db.User.findById(req.params.id);
    if(userGetted){
       next();
    }else{
        return res.status(400).send({
            message:"The user doesn't exist",
        })
    }
}
module.exports = {
    userExistsMiddleweare:userExistsMiddleweare,
    userNotExistsMiddleweare:userNotExistsMiddleweare
}