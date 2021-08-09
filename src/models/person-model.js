const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const personSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    birthDateISO: {
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

personSchema
  .virtual("birthDate")
  .set((date) => {
    this.birthDateISO = new Date(date);
  })
  .get(() => {
    return this.birthDateISO.toISOString().substring(0, 10);
  });

const Person = mongoose.model("person", personSchema);

module.exports = Person;
