const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.post("/create", controller.create);
  router.get("/count/:invite", controller.count);
  router.get("/list", controller.get);
  return router;
};
