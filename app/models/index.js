require("dotenv").config();
const config = require("../config/" + process.env.NODE_ENV_TYPE + ".config.js");
const Sequelize = require("sequelize");

const db = {};

// Mocking DB
if (process.env.NODE_ENV_TYPE === "test") {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const patientMock = dbMock.define('patient', {
        id: 62,
        name: "Valerya",
        surname: "Shvets",
        patronymic: "Sergeevna",
        gender: "female",
        birthday: "1979-04-08",
        address: "Orenburg, Ozernaya, 1a",
        oms_number: "4925492650264857"
    }, {
        timestamps: false,
    });
    db.sequelize = dbMock;
    db.patient = patientMock;
} else {
    sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
        dialect: config.dialect,
        define: {
            timestamps: false
        }
    });
    db.sequelize = sequelize;
    db.patient = require('./patient.model')(sequelize, Sequelize)
}

db.Sequelize = Sequelize;
module.exports = db;
