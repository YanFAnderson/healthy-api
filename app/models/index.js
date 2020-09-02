const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        dialect: dbConfig.dialect,
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
