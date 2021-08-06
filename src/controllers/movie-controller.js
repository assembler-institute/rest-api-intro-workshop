const db = require("../models");

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

async function fetchMovieById(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findById(movieId).lean();

    res.status(200).send({ data: movie });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

async function postMovie(req, res, next) {
  const { title } = req.body;

  try {
    const movie = await db.Movie.findOne({ title });

    if (movie) {
      res.status(400).send({ message: "Movie already exists!" });
      next();
    } else {
      await db.Movie.create(req.body);

      res.status(200).send({
        data: req.body,
        message: "Movie created successfully!",
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

async function patchMovie(req, res, next) {
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

async function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const movie = await db.Movie.findByIdAndDelete(movieId);

    if (!movie) {
      res.status(200).send({
        message: "Can't remove this movie!",
      });
      next();
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

async function fetchCredits(req, res, next) {
  const { id: movieId } = req.params;

  try {
    const credits = await db.Movie.findById(movieId)
      .populate("cast")
      .populate("crew");

    res.status(200).send({ data: credits });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

async function postCredits(req, res, next) {
  const { id: movieId } = req.params;
  const { crew = undefined, cast = undefined } = req.body;

  try {
    const movie = await db.Movie.findByIdAndUpdate(
      { _id: movieId },
      { $addToSet: { crew: crew, cast: cast } },
      { new: true, omitUndefined: true },
    );

    if (!movie) {
      res.status(400).send({ message: "Credit id not found!" });
    } else {
      res.status(200).send({
        data: movie,
        message: "Credit updated successfully!",
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
}

async function patchCredits(req, res, next) {}
async function deleteCredits(req, res, next) {}

async function validateCastCrew(req, res, next) {
  const { crew = undefined, cast = undefined } = req.body;

  try {
    // Validate crew
    if (crew) {
      const cr = await db.Person.findById(crew);
      if (!cr) {
        res.status(400).send({ msg: "crew not found in Person collection!" });
        return;
      }
    }

    // Validate cast
    if (cast) {
      const ct = await db.Person.findById(cast);
      if (!ct) {
        res.status(400).send({ msg: "cast not found in Person collection!" });
        return;
      }
    }
    next();
  } catch (error) {
    next(error);
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
  validateCastCrew,
};
