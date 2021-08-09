const db = require("../models");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function fetchMovies(req, res, next) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  try {
    const count = await db.Movie.countDocuments();

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(count / limit);

    const movies = await db.Movie.find({})
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).send({
      page: page,
      total_pages: totalPages,
      data: movies,
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
async function fetchMovieById(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findById(movieId).lean();

    if (!movie) {
      res.status(400).send({ message: "Movie not found" });
      return;
    }

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
async function postMovie(req, res, next) {
  const { title } = req.body;

  try {
    const movie = await db.Movie.findOne({ title });

    if (movie) {
      res.status(400).send({ message: "Movie already exists!" });
      return;
    }

    await db.Movie.create(req.body);

    res.status(201).send({
      message: "Movie created successfully!",
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
async function patchMovie(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findOneAndUpdate(
      { _id: movieId },
      { ...req.body },
      { new: true },
    );

    if (!movie) {
      res.status(400).send({ message: "There is no movie with id " + movieId });
      return;
    }

    res.status(200).send({
      message: "Movie updated successfully!",
      data: movie,
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
async function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findByIdAndDelete(movieId);

    if (!movie) {
      res.status(400).send({ message: "Movie not found!" });
      return;
    }

    res.status(200).send({
      message: "Movie deleted successfully!",
      data: movie,
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
async function fetchCredits(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const credits = await db.Movie.findById(movieId)
      .populate({
        path: "cast",
        select: { name: 1 },
      })
      .populate({
        path: "crew",
        select: { name: 1 },
      });

    res.status(200).send({ data: credits });
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
async function postCredits(req, res, next) {
  const { id: movieId } = req.params;
  const { crew = undefined, cast = undefined } = req.body;

  try {
    const movie = await db.Movie.findByIdAndUpdate(
      { _id: movieId },
      { $addToSet: { crew: crew, cast: cast } },
      { new: true, omitUndefined: true },
    )
      .populate({
        path: "cast",
        select: { name: 1 },
      })
      .populate({
        path: "crew",
        select: { name: 1 },
      });

    if (!movie) {
      res.status(400).send({ message: "Credit id not found!" });
    } else {
      res.status(201).send({
        message: "Credit updated successfully!",
        data: movie,
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
async function patchCredits(req, res, next) {
  // TODO: as an array of objects
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteCredits(req, res, next) {
  const { id: movieId, creditId } = req.params;

  try {
    const movie = await db.Movie.findById(movieId);

    if (!movie) {
      res.status(400).send({ message: "Movie not found!" });
      return;
    }

    const updatedMovie = await db.Movie.findOneAndUpdate(
      { _id: movieId },
      { $pull: { crew: creditId, cast: creditId } },
      { new: true },
    )
      .populate({
        path: "cast",
        select: { name: 1 },
      })
      .populate({
        path: "crew",
        select: { name: 1 },
      });

    if (
      updatedMovie.cast.length === movie.cast.length &&
      updatedMovie.crew.length === movie.crew.length
    ) {
      res.status(400).send({ message: "Crew / Cast not found!" });
      return;
    }

    res.status(200).send({
      message: "Crew / Cast deleted successfully!",
      data: updatedMovie,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

module.exports = {
  fetchMovies,
  fetchMovieById,
  postMovie,
  patchMovie,
  deleteMovie,
  fetchCredits,
  postCredits,
  patchCredits,
  deleteCredits,
};
