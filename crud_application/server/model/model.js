//creating the mongoDB shema

const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  insurance: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  doctor: {
    type: String,
    required: true,
  },
});

const USerdb = mongoose.model('userdb',schema);

module.exports = USerdb;


