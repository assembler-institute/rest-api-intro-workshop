const jwt = require("jsonwebtoken");
const db = require("../models");
const { config } = require("../config");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];

  try {
    if (!token)
      return res
        .status(403)
        .send({ message: "You need a token, please register!" });

    const decoded = jwt.verify(token, config.jwt.SECRET);
    const _id = decoded.id;

    const user = db.User.findById(_id, { password: 0 });

    if (!user) return res.status(404).send({ message: "User not found!" });

    next();
  } catch (error) {
    return res.status(403).send({ message: "unauthorized!" });
  }
}

module.exports = { checkToken };
