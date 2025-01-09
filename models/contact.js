const mongoose = require("../db");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  cpf: {
    type: String,
  },
  birth: {
    type: String,
  },
  plot: {
    type: String,
  },
  plots: {
    type: String,
  },
  value: {
    type: String,
  },
  total: {
    type: String,
  },
  whats: {
    type: String,
  },
  phone: {
    type: String,
  },
  typeCorp: {
    type: String
  },
  password: {
    type: String,
  },
  invite: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
