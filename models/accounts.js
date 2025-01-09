const mongoose = require("../db");

const AccountsSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Accounts = mongoose.model("Accounts", AccountsSchema);

module.exports = Accounts;
