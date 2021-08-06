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
      type: Number,
    },
    genres: {
      type: [String],
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
          "Historical",
        ],
        message: "{VALUE} is not supported",
      },

      validate: {
        validator: (v) => v.length > 0,
        message: (props) => `Must be an Array and not empty`,
      },
    },
    duration: {
      //TODO: add a getter to convert it
      type: Number, // seconds
    },

    // TODO: Manage Repeated properties
    cast: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "person",
      validate: {
        validator: (v) => v.length > 0,
        message: (props) => `Must be an Array and not empty`,
      },
    },
    crew: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "person",
      validate: {
        validator: (v) => v.length > 0,
        message: (props) => `Must be an Array and not empty`,
      },
    },
  },

  {
    timestamps: true,
  },
);

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
