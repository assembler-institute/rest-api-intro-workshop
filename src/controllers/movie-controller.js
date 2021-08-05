const db = require("../models");

async function fetchMovies(req, res, next) {
  try {
    const movies = await db.Movie.find({}).lean();
    res.status(200).send({
      page: 1,
      data: movies,
      total_pages: 22,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { fetchMovies };
