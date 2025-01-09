const routes = require("./routes");
const controller = require("./controller");

module.exports = () => ({
  name: "contact",
  routes: routes(controller)
});