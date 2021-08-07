const db = require("../models");
const { encryptPassword } = require("../utils/encrypt");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function signUp(req, res, next) {
  const { email, password, firstName, lastName, roles } = req.body;

  try {
    if (roles) {
      const dbRoles = await db.Role.find({ name: { $in: roles } });
      const roleIds = dbRoles.map((role) => role._id);
      console.log(roleIds);
    }

    const { _id } = await db.User.create({
      email: email,
      password: await encryptPassword(password),
      firstName: firstName,
      lastName: lastName,
    });

    return res.status(200).send({
      id: _id,
      email,
    });
  } catch (err) {
    res.status(400).send({ message: "can't create new user" });
    next(err);
  }
}

module.exports = { signUp };
