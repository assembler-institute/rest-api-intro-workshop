const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
const { roleSchema } = require("./role-model");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    password: {
      type: String,
      unique: true,
    },
    roles: [roleSchema],
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
