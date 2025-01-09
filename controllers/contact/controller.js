const Contact = require("../../models/contact");
const fetch = require("node-fetch");

const BASE_URL = "https://bko.backoffice-allphome.com.br/backoffice/";
const LOGIN_URL = `${BASE_URL}auth/login`;
const USER_LIST_URL = `${BASE_URL}user/all?limit=250&offset=0&isDESC=true&orderBy=createdAt`;

const createHeaders = (token = "") => ({
  accept: "application/json, text/plain, */*",
  "access-control-allow-origin": "*",
  authorization: token ? `Bearer ${token}` : "",
  "content-type": "application/json",
  Referer: "https://backoffice-allphome.com.br/",
  "Referrer-Policy": "strict-origin-when-cross-origin",
});

let token = null;

const login = async () => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({
      email: "system-admin@allphome.com",
      password: "Al1p#H0m3",
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data.accessToken;
};

// Função para listar usuários
const listUsers = async (token) => {
  const response = await fetch(USER_LIST_URL, {
    method: "GET",
    headers: createHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user list");
  }

  const data = await response.json();
  return data.rows.map((item) => ({
    ...item,
    whats: item.phone,
    birth: item.birthDate,
    cpf: item.document,
  }));
};

const controller = {
  create: async (req, res) => {
    try {
      const contact = await Contact.create(req.body);
      return res.status(201).send(contact);
    } catch (err) {
      res.status(500).send({ error: "Registration failed" });
    }
  },
  count: async (req, res) => {
    const { invite } = req.params;
    try {
      const contacts = await Contact.find({ invite });
      return res.status(200).send({ count: contacts.length });
    } catch (err) {
      res.status(500).send({ error: "Failed to count contacts" });
    }
  },
  get: async (req, res) => {
    try {
      try {
        const users = await listUsers(token);
        return res.status(200).send({ list: users });
      } catch {
        token = await login();
        const users = await listUsers(token);
        return res.status(200).send({ list: users });
      }
    } catch (err) {
      res.status(500).send({ error: err.message || "Failed to fetch data" });
    }
  },
};

module.exports = controller;
