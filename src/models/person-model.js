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
          values: [
            "Director",
            "Composer",
            "Actor",
            "Writer",
            "Film Producer",
            "Actress",
          ],
          message: "{VALUE} is not supported",
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

// TODO: un virtual para formatear la fecha que se manda al usuario

// TODO: se podria hacer un descriminator para heredar de un
// TODO: esquema padre que contiene todos esos virtuales

const Person = mongoose.model("person", personSchema);

module.exports = Person;
