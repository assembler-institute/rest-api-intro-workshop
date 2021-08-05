const db = require("../models");
const { getSeedMovies } = require("./seed-data");

async function seedMovies() {
  const movies = [...getSeedMovies()].map((movie) => ({
    ...movie,
  }));

  await db.Movie.deleteMany({});
  await db.Movie.create([...movies]);
}
module.exports = {
  seedMovies: seedMovies,
};
