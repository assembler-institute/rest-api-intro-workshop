const jwt = require("jsonwebtoken");
const { config } = require("../../config");

/**
 *
 * @param {*} email
 */
function generateAccessToken(email) {
  // 86400: 24 hours
  return jwt.sign({ email }, config.jwt.SECRET, { expiresIn: 60 });
}

module.exports = { generateAccessToken };
