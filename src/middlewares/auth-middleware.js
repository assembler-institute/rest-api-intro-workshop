const db = require("../models");
const { getAuthToken, verifyAuthToken } = require("../services/auth");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function checkToken(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const { email } = await verifyAuthToken(bearerToken);

    const user = await db.User.findOne({ email }, { password: 0 });

    if (!user)
      return res.status(404).send({ message: "User token not found!" });

    next();
  } catch (err) {
    res.status(403).send({ message: err.message });
    next(err);
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
