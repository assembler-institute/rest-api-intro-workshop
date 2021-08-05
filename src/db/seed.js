const db = require("../models");
const { getSeedMovies } = require("./data-movie");
const { getSeedPersons } = require("./data-person");

async function seedMovies() {
  const movies = [...getSeedMovies()].map((movie) => ({ ...movie }));
  await db.Movie.deleteMany({});
  await db.Movie.create([...movies]);
}

async function seedPersons() {
  const persons = [...getSeedPersons()].map((person) => ({ ...person }));
  await db.Person.deleteMany({});
  await db.Person.create([...persons]);
}

module.exports = {
  seedMovies: seedMovies,
  seedPersons: seedPersons,
};
