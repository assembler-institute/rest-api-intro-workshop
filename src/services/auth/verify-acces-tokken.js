const jwt = require('jsonwebtoken');
const  config  = require("../../config");

function verifyTokken(token){
    return new Promise((resolve, reject) => {
        
      const res = jwt.verify(token,config.accessToken.tokkenKey);
      if(!res)reject("JWT validation errror");
      resolve(res);
    })
}

module.exports={
    verifyTokken:verifyTokken
}