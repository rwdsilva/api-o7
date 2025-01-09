const port = process.env.PORT || 3002;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authResource = require("./controllers/auth")();
const contactResource = require("./controllers/contact")();
const authMiddleware = require("./middlewares/auth");
const publicRouter = express.Router();
const privateRouter = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
publicRouter.use(`/${authResource.name}`, authResource.routes);
publicRouter.use(`/${contactResource.name}`, contactResource.routes);
privateRouter.use(authMiddleware);

app.use(express.static("public"));
app.use(publicRouter);
app.use(privateRouter);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
