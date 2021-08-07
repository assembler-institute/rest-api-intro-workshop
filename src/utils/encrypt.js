const bcrypt = require("bcrypt");
const { config } = require("../config");

/**
 * Encrypts the string requested
 *
 * @param {String} data odm promise
 * @returns object encrypted data
 */
async function encryptPassword(data) {
  const salt = await bcrypt.genSalt(Number(config.encrypt.salt));
  const encryptedData = await bcrypt.hash(data, salt);
  return encryptedData;
}

async function comparePassword({ plainData, encryptedData }) {
  const isSame = await bcrypt.compare(plainData, encryptedData);
  return isSame;
}

module.exports = {
  encryptPassword,
  comparePassword,
};
