require("dotenv").config();
const config = require("./app/config/" + process.env.NODE_ENV_TYPE + ".config.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: config.CORS_ORIGIN
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
db.sequelize.sync;

require("./app/routes/api.routes")(app);

const PORT = config.NODE_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Selected env - ${process.env.NODE_ENV_TYPE}`);
    console.log(`Server is running on ${PORT}`)
});
