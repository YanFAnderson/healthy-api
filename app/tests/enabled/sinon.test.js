process.env.NODE_ENV_TYPE = "test";
console.log(process.env.NODE_ENV_TYPE);

const {expect, use} = require('chai');
const request = require('request');
const sinon = require('sinon');
const patient = require("../../controllers/patient.controller");
const sinonChai = require('sinon-chai');
use(sinonChai);


const mockReq = (query = {}, body = {}) => {
    return {query: query, body: body};
};
const mockRes = (expectedStatus) => {
    res = {
        send: function () {
        },
        json: function (err) {
            console.log("\n : " + err);
        },
        status: function (responseStatus) {
            expect(responseStatus).to.equal(expectedStatus);
            return this;
        }
    };
    return res;
};

describe('Patients list', () => {
    it('Happy path', (done) => {
        let req = mockReq();
        let res = mockRes(200);
        patient.findAll(req, res);
        done()
    })
});

describe('Patient create', () => {
    it('Happy path', (done) => {
        let req = mockReq({}, {
            name: "test",
            surname: "test",
            patronymic: "test",
            gender: "male",
            address: "test",
            birthday: "2002-09-09",
            oms_number: "1234567890123456"
        });
        let res = mockRes(200);
        patient.create(req, res);
        done()
    });
    it('Sad path', (done) => {
        let req = mockReq();
        let res = mockRes(500);
        patient.create(req, res);
        done()
    })

});

describe('Patient edit', () => {
    it('Happy path', (done) => {
        let req = mockReq({}, {id: "62", "name": "Test"});
        let res = mockRes(200);
        patient.update(req, res);
        done()
    });
    it('Sad path', (done) => {
        let req = mockReq();
        let res = mockRes(500);
        patient.update(req, res);
        done()
    })
});

describe('Patient delete', () => {
    it('Happy path', (done) => {
        let req = mockReq({id: "62"});
        let res = mockRes(200);
        patient.delete(req, res);
        done()
    });
    it('Sad path', (done) => {
        let req = mockReq();
        let res = mockRes(500);
        patient.delete(req, res);
        done()
    })
});
