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
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findById(movieId).lean();

    res.status(200).send({ data: movie });
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
  const { title } = req.body;

  try {
    const movie = await db.Movie.findOne({ title });

    if (movie) {
      res.status(400).send({ message: "Movie already exists!" });
      next();
    } else {
      await db.Movie.create(req.body);

      res.status(201).send({
        data: req.body,
        message: "Movie created successfully!",
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
async function patchPerson(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findOneAndUpdate(
      { _id: movieId },
      { ...req.body },
      { new: true },
    );

    if (!movie) {
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
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findByIdAndDelete(movieId);

    if (!movie) {
      res.status(200).send({ message: "Movie not found!" });
      return;
    }

    res.status(200).send({
      data: movie,
      message: "Movie deleted successfully!",
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
