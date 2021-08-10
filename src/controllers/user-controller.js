const db = require("../models");
const { encryptPassword } = require("../utils/encrypt");
const { config } = require("../config");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function signIn(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await db.User.findOne({ email: email });

    if (response) return res.status(200).send({ email });

    await db.User.create({
      firebase_id: uid,
      email: email,
      roles: req.body.roles,
    });

    if (response) return res.status(200).send({ email });
  } catch (err) {
    res.status(400).send({ message: err.message });
    next(err);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function fetchUsers(req, res, next) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  try {
    const count = await db.User.countDocuments();

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(count / limit);

    const users = await db.User.find({}, { password: 0 })
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .populate("roles")
      .lean();

    const populatedUsers = users.map((user) => {
      const roles = user.roles.map((role) => role.name);
      user.roles = roles;
      return user;
    });

    res.status(200).send({
      page: page,
      total_pages: totalPages,
      data: populatedUsers,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function fetchUserById(req, res, next) {
  const { id: userId } = req.params;

  try {
    const user = await db.User.findById(userId, { password: 0 })
      .populate({
        path: "roles",
      })
      .lean();

    if (!user) return res.status(400).send({ message: "User not found" });

    const roles = user.roles.map((role) => role.name);
    user.roles = roles;

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function patchUser(req, res, next) {
  const { id: userId } = req.params;

  try {
    const user = await db.User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true },
    );

    if (!user) return res.status(400).send({ message: `User not found` });

    req.body.roles = req.rolesNames;

    res.status(200).send({
      message: "User updated successfully!",
      data: req.body,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteUser(req, res, next) {
  const { id: userId } = req.params;

  try {
    const user = await db.User.findByIdAndDelete(userId).select({
      password: 0,
    });

    if (!user) {
      res.status(400).send({ message: "User not found!" });
      return;
    }

    res.status(200).send({
      message: "User deleted successfully!",
      data: user,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  signIn,
  fetchUsers,
  fetchUserById,
  patchUser,
  deleteUser,
};
