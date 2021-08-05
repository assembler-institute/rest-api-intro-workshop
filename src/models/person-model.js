const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const personSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: [true, "birth date is required"],
    },
    birthPlace: {
      type: String,
    },
    roles: [
      {
        type: String,
        required: true,
        enum: {
          values: ["director", "composer", "actor"],
          message: "{VALUE} is not supported",
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Person = mongoose.model("person", personSchema);

module.exports = Person;
