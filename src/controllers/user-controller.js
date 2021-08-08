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
      //TODO: Validar los roles pasados por el usuario
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
  const { roles } = req.body;

  try {
    if (roles) {
      const dbRoles = await db.Role.find({ name: { $in: roles } });
      req.body.roles = dbRoles.map((role) => role._id);
      req.body.roleNames = dbRoles.map((role) => role.name);
    }

    const user = await db.User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true },
    );

    if (!user) return res.status(400).send({ message: `User not found` });

    req.body.roles = req.body.roleNames;
    delete req.body.roleNames;

    res.status(200).send({
      message: "User updated successfully!",
      data: req.body,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

module.exports = { signUp, fetchUsers, fetchUserById, patchUser };
