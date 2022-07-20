const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateregistered: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
