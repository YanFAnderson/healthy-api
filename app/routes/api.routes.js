module.exports = app => {
    const patient = require("../controllers/patient.controller.js");
    var router = require("express").Router();

    router.get("/patient", patient.findAll);
    router.post("/patient", patient.create);
    router.put("/patient", patient.update);
    router.delete("/patient", patient.delete);
    router.get("/search", patient.search);

    app.use('/api', router)
};
