const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.put("/update/:id", controller.update);
  router.get("/:id", controller.getUser);
  return router;
};
