const { validateCastCrew } = require("./credit-middleware");
const auth = require("./auth-middleware");
const user = require("./user-middleware");
// const { validateCastCrew } = require("./user-middleware");

module.exports = {
  validateCastCrew,
  authMiddleware: auth,
  userMiddleware: user,
};
