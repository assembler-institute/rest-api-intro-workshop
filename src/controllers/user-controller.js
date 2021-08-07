const db = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postUser(req, res, next) {
  const { name } = req.body;

  try {
    const person = await db.Person.findOne({ name });

    if (person) {
      res.status(400).send({ message: "Person already exists!" });
      return;
    }

    await db.Person.create(req.body);

    res.status(201).send({
      message: "Person created successfully!",
      data: req.body,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

module.exports = { postUser };
