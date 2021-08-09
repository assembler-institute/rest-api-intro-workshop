const db = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function validateRoles(req, res, next) {
  const { roles } = req.body;

  try {
    if (roles?.length) {
      const dbRoles = roles.map(async (role) => {
        const dbRole = await db.Role.findOne({ name: role }).lean();
        if (dbRole) return dbRole._id;
      });

      // req.body.rolesNames = req.body.roles.map((role) => role);
      req.rolesNames = req.body.roles;
      req.body.roles = await Promise.all(dbRoles);

      const i = req.body.roles.findIndex((role) => !role);
      if (i !== -1)
        return res
          .status(400)
          .send({ message: `Role '${roles[i]}' not found` });
    } else {
      const defaultRole = await db.Role.findOne({ name: "User" });
      req.body.roles = [defaultRole._id];
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validateRoles };
