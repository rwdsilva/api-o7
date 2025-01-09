const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const Accounts = require("../../models/accounts");

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret);

const controller = {
  register: async (req, res) => {
    const { email, code } = req.body;
    try {
      if (code != "437rf2y34hf732h4fn73824fh32n7f7314hf27") {
        return res.status(400).send({ error: "Invalid code" });
      }
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });
      }
      const user = await User.create(req.body);
      await Accounts.create(req.body);
      user.password = undefined;
      return res.send({
        user,
        token: generateToken({ message: true }),
      });
    } catch (err) {
      res.status(500).send({ error: "Registration failed" });
    }
  },

  getUser: async (req, res) => {
    const { _id } = req.params;

    const user = await User.findOne({ _id });

    return res.status(200).send({ user });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }
    user.password = undefined;
    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  },
  update: async (req, res) => {
    const { password } = req.body;
    try {
      const newPassword = password && (await bcrypt.hash(password, 10));
      const data = password && { ...req.body, password: newPassword };
      await User.update({ _id: req.params.id }, password ? data : req.body);
      const user = await User.find({ _id: req.params.id });
      res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      res.status(500).send({ error: "Failed" });
    }
  },
};

module.exports = controller;
