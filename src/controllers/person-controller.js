const db = require("../models");
const { startSession } = require("mongoose");

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
      message: "Person created successfully!",
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
async function patchPerson(req, res, next) {
  const { id: personId } = req.params;

  try {
    const person = await db.Person.findOneAndUpdate(
      { _id: personId },
      { ...req.body },
      { new: true },
    );

    if (!person) {
      res.status(400).send({ message: `Person with id ${personId} not found` });
      return;
    }

    res.status(200).send({
      message: "Person updated successfully!",
      data: person,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

// TODO: delete person debe borrar las ids de cast y crew

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deletePerson(req, res, next) {
  const { id: personId } = req.params;

  try {
    const session = await startSession();

    // Start transaction
    session.startTransaction();
    const person = await db.Person.findByIdAndDelete(personId);
    await db.Movie.findOneAndUpdate(
      {},
      { $pull: { crew: personId, cast: personId } },
    );

    // End transaction
    await session.commitTransaction();
    session.endSession();

    if (!person) {
      res.status(400).send({ message: "Person not found!" });
      return;
    }

    res.status(200).send({
      message: "Person deleted successfully!",
      data: person,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
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
