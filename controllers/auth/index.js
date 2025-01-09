const routes = require("./routes");
const controller = require("./controller");

module.exports = () => ({
  name: "auth",
  routes: routes(controller)
});