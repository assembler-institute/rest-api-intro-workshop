const jwt = require("jsonwebtoken");
const { config } = require("../../config");

/**
 *
 * @param {*} token
 */
async function verifyAuthToken(token) {
  return new Promise(function verifyAuthTokenHandler(resolve, reject) {
    const res = jwt.verify(token, config.jwt.SECRET);
    if (!res) reject("JWT validation error!");
    resolve(res);
  });
}

module.exports = {
  verifyAuthToken: verifyAuthToken,
};
