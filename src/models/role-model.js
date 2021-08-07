const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

const roleModel = mongoose.model("role", roleSchema);

module.exports = { roleModel, roleSchema };
