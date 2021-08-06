const db = require("../models");

const LIMIT = 4;

async function fetchMovies(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;

    const count = await db.Movie.countDocuments();

    const skip = (page - 1) * LIMIT;
    const totalPages = Math.ceil(count / LIMIT);

    const movies = await db.Movie.find({})
      .sort({ title: 1 })
      .skip(skip)
      .limit(LIMIT)
      .lean();

    res.status(200).send({
      page: page,
      total_pages: totalPages,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
}

async function patchMovie(req, res, next) {
  try {
    const { id: movieId } = req.params;
    console.log(movieId);
    const movies = await db.Movie.findOneAndUpdate(
      {
        _id: movieId,
      },
      { ...req.body },
      {
        new: true,
      },
    );

    res.status(200).send({
      data: movies,
      message: "Movie updated successfully!",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { fetchMovies, patchMovie };
