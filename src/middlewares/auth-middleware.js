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
    req.userId = decoded._id;

    const user = await db.User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).send({ message: "User not found!" });

    next();
  } catch (error) {
    return res.status(403).send({ message: "unauthorized!" });
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function isAdmin(req, res, next) {
  const { userId } = req;

  try {
    const user = await db.User.findOne(
      { _id: userId },
      { password: 0 },
    ).populate({
      path: "roles",
      match: { name: "Admin" },
    });

    if (!user.roles.length)
      return res.status(400).send({ message: "Must be an admin" });
    else next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}
module.exports = { checkToken, isAdmin };
