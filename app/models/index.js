require("dotenv").config();
const config = require("../config/"+process.env.NODE_ENV_TYPE+".config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
        dialect: config.dialect,
        define: {
            timestamps: false
        }
    })
;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.patient = require("./patient.model.js")(sequelize, Sequelize);

module.exports = db;
