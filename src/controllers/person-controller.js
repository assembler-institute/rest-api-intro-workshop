const db = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function fetchPersons(req, res, next) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  try {
    const count = await db.Person.countDocuments();

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(count / limit);

    const persons = await db.Person.find({})
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).send({
      page: page,
      total_pages: totalPages,
      data: persons,
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
async function fetchPersonById(req, res, next) {
  const { id: personId } = req.params;

  try {
    const person = await db.Person.findById(personId).lean();

    if (!person) {
      res.status(400).send({ message: "Person not found" });
      return;
    }

    res.status(200).send({ data: person });
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
async function postPerson(req, res, next) {
  const { name } = req.body;

  try {
    const person = await db.Person.findOne({ name });

    if (person) {
      res.status(400).send({ message: "Person already exists!" });
      return;
    }

    await db.Person.create(req.body);

    res.status(201).send({
      data: req.body,
      message: "Person created successfully!",
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
async function patchPerson(req, res, next) {
  const { id: personId } = req.params;

  try {
    const person = await db.Movie.findOneAndUpdate(
      { _id: personId },
      { ...req.body },
      { new: true },
    );

    if (!person) {
      res.status(200).send({ message: "There is no movie with id " + movieId });
      next();
    } else {
      res.status(200).send({
        data: movie,
        message: "Movie updated successfully!",
      });
    }
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
async function deletePerson(req, res, next) {
  const { id: personId } = req.params;

  try {
    const person = await db.Person.findByIdAndDelete(personId);

    if (!person) {
      res.status(200).send({ message: "Person not found!" });
      return;
    }

    res.status(200).send({
      data: person,
      message: "Person deleted successfully!",
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  fetchPersons,
  postPerson,
  fetchPersonById,
  patchPerson,
  deletePerson,
};
