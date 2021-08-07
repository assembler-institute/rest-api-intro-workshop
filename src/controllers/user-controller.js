const db = require("../models");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../utils/encrypt");
const { config } = require("../config");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function signUp(req, res, next) {
  const { email, password, firstName, lastName, roles } = req.body;
  let roleIds = null;

  try {
    if (roles) {
      const dbRoles = await db.Role.find({ name: { $in: roles } });
      roleIds = dbRoles.map((role) => role._id);
    } else {
      const dbRole = await db.Role.findOne({ name: "User" });
      roleIds = [dbRole._id];
    }

    const { _id } = await db.User.create({
      email: email,
      password: await encryptPassword(password),
      firstName: firstName,
      lastName: lastName,
      roles: roleIds,
    });

    const token = jwt.sign({ _id }, config.jwt.SECRET, { expiresIn: 86400 });

    return res.status(200).send({
      id: _id,
      email,
      token,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
    next(err);
  }
}

module.exports = { signUp };
