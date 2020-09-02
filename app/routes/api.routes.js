module.exports = app => {
    const patient = require("../controllers/patient.controller.js");
    var router = require("express").Router();

    router.get("/patient/list", patient.findAll);
    router.get("/patient/create", patient.create);
    router.get("/patient/delete", patient.delete);
    router.get("/patient/update", patient.update);
    router.get("/patient/search", patient.search);

    app.use('/api', router)
};
