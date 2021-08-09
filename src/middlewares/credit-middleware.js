const db = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function validateCastCrew(req, res, next) {
  const { crew = undefined, cast = undefined } = req.body;

  try {
    // Validate crew
    if (crew) {
      const cr = await db.Person.findOne({
        _id: crew,
        roles: { $in: ["Director", "Composer"] },
      });
      if (!cr) {
        res.status(400).send({
          message:
            "crew not found in Person collection! Must be a director or a composer",
        });
        return;
      }
    }

    // Validate cast
    if (cast) {
      const ct = await db.Person.findOne({ _id: cast, roles: "Actor" });
      if (!ct) {
        res
          .status(400)
          .send({ message: "Actor not found in Person collection!" });
        return;
      }
    }
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid id" });
  }
}

module.exports = { validateCastCrew };
