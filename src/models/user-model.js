const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
const db = require("./index");

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
    roles: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "role",
    },
  },

  {
    timestamps: true,
  },
);

// Scheme hooks
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000 && error.keyPattern.email)
    next(new Error("Email already exists!"));
  else next(error);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
