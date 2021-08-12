const {
    userExistsMiddleweare,
    userNotExistsMiddleweare
} = require("./user-middleweares");
 const { authMiddleweare } = require("./auth-middleweare");

module.exports={
    userExistsMiddleweare:userExistsMiddleweare,
    userNotExistsMiddleweare:userNotExistsMiddleweare,
    authMiddleweare:authMiddleweare,
}