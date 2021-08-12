// ESTA PARTE ES GESTIONAR EL TOKKEN CUSTOMIZADO(ya funciona)
// const { verifyTokken } = require("../services/auth/verify-acces-tokken")
// async function authMiddleweare(req,res,next){
//     try{
//         if(req.headers.authorization &&
//             req.headers.authorization.startsWith("Bearer")
//             ){
//             const userClaims = await verifyTokken(req.headers.authorization.substr(7));
//             req.user = userClaims;
//             next()
//         }

//     }catch(err){
//         return res.status(401).send({
//             "error":err});
//     }
// }
// ESTA PARTE ES GESTIONAR EL TOKKEN MEDIANTE FIREBASE

const { auth } = require("../services/firebase/firebase");
async function authMiddleweare(req,res,next){
    try{
        if(req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
            ){
            const userClaims = await auth.verifyIdToken(req.headers.authorization.substr(7));
            const {email,uid} = userClaims;
            req.user = {
                email:email,
                uid:uid,
            };
            next()
        }

    }catch(err){
        return res.status(401).send({
            "error":err});
    }
}

module.exports={
    authMiddleweare:authMiddleweare
}