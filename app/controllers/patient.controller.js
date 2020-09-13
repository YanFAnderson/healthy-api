const db = require("../models");
let Patient = db.patient;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Patient.findAll()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred!"
            })
        })
};

exports.create = (req, res) => {
    const patient = {
        name: req.body.name || null,
        surname: req.body.surname || null,
        patronymic: req.body.patronymic || null,
        gender: req.body.gender || null,
        birthday: req.body.birthday || null,
        address: req.body.address || null,
        oms_number: req.body.oms_number || null
    };
    Object.values(patient).forEach(function (value) {
        if (value === null) {
            res.status(500).send({
                message: "Blank value!"
            })
        }
    });
    Patient.create(patient)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            })
        })
};

exports.delete = (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(500).send({
            message: "Please, specify id!"
        })
    }
    Patient.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Patient was deleted successfully!"
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Patient."
            })
        })
};

exports.update = (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.status(500).send({
            message: "Please, specify id!"
        })
    }
    Patient.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num[0] === 1) {
                res.status(200).send({
                    message: "Patient updated successfully!"
                })
            } else {
                res.status(500).send({
                    message: `Cannot update Patient with id=${id}. Maybe Patient was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient."
            })
        })
};

exports.search = (req, res) => {
    const id = req.query.id || null;
    const name = req.query.name || null;
    const surname = req.query.surname || null;
    const patronymic = req.query.patronymic || null;
    const birthday = req.query.birthday || null;
    const address = req.query.address || null;
    const oms_number = req.query.oms_number || null;
    const gender = req.query.gender || null;
    const arr = [];
    if (id) arr.push({id: id});
    if (name) arr.push({name: name});
    if (surname) arr.push({surname: surname});
    if (patronymic) arr.push({patronymic: patronymic});
    if (birthday) arr.push({birthday: birthday});
    if (address) arr.push({address: address});
    if (oms_number) arr.push({oms_number: oms_number});
    if (gender) arr.push({gender: gender});

    Patient.findAll({
        where: {
            [Op.and]: arr
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error has occurred."
            });
        });
};
