const db = require("../models");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/encrypt");
const { config } = require("../config");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email });

    if (!user) return res.status(400).send({ message: "User not registered!" });

    const pass = await comparePassword(password, user.password);

    if (!pass)
      return res.status(401).send({ message: "Invalid email or password!" });

    const { _id } = user;
    const token = jwt.sign({ _id }, config.jwt.SECRET, { expiresIn: 86400 });

    return res.status(200).send({
      email,
      token,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
    next(err);
  }
}

module.exports = { signIn };
