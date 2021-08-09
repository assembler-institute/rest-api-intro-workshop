const db = require("../models");
const randToken = require("rand-token");
const { comparePassword } = require("../utils/encrypt");
const { generateAccessToken } = require("../services/auth");
const { session } = require("../session");

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

    const accessToken = generateAccessToken(email);
    const refreshToken = randToken.uid(256);

    session.refreshTokens[refreshToken] = email;

    return res.status(200).send({
      email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
    next(err);
  }
}

module.exports = { signIn };
