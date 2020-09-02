const db = require("../models");
const Patient = db.patient;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    Patient.findAll()
        .then(data => {
            res.send(data)
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
        name: req.query.name,
        surname: req.query.surname,
        patronymic: req.query.patronymic,
        gender: req.query.gender,
        birthday: req.query.birthday,
        address: req.query.address,
        oms_number: req.query.oms_number
    };
    Patient.create(patient)
        .then(data => {
            res.send(data);
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
            if (num == 1) {
                res.send({
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
    const id = req.query.id;
    if (!id) {
        res.status(500).send({
            message: "Please, specify id!"
        })
    }
    Patient.update(req.query, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error has occurred."
            });
        });
};
