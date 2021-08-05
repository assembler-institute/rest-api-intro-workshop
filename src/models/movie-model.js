const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    releaseYear: {
      type: Date,
    },
    genres: [
      {
        type: String,
        required: true,
        enum: {
          values: [
            "Action",
            "Comedy",
            "Drama",
            "Fantasy",
            "Horror",
            "Mystery",
            "Romance",
            "Thriller",
            "Western",
          ],
          message: "{VALUE} is not supported",
        },
      },
    ],
    duration: {
      //TODO: add a getter to convert it
      type: Number, // seconds
    },
    cast: [
      { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "person" },
    ],
    crew: [
      { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "person" },
    ],
  },

  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
