const userModel = require("./user-model");
const movieModel = require("./movie-model");
const personModel = require("./person-model");
const roleModel = require("./role-model");

module.exports = {
  User: userModel,
  Movie: movieModel,
  Person: personModel,
  Role: roleModel,
};
