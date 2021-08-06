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
    const movies = await db.Movie.findOneAndUpdate(
      { _id: movieId },
      { ...req.body },
      { new: true },
    );

    res.status(200).send({
      data: movies,
      message: "Movie updated successfully!",
    });
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

module.exports = {
  fetchMovies,
  fetchMovieById,
  postMovie,
  patchMovie,
  deleteMovie,
};
