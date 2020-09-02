var describe = require("mocha").describe;
var expect = require("chai").expect;
var request = require("request");
const PORT = process.env.PORT || 8080;
var api_url = "http://localhost:" + PORT + "/api";
var patient_id;


describe("Patients list", function () {
    it("Normal request", function (done) {
        var url = api_url + "/patient/list";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
});

describe("Patients create", function () {
    it("Normal request", function (done) {
        var url = api_url + "/patient/create?name=Test&surname=Test&patronymic=Test&gender=male&address=Test&birthday=2002-02-02&oms_number=1234567890123456";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(200);
            patient_id = JSON.parse(body).id;
            done();
        })
    });
    it("Blank request", function (done) {
        var url = api_url + "/patient/create";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(500);
            done();
        })
    })
});

describe("Patients edit", function () {
    it("Normal request", function (done) {
        var url = api_url + "/patient/update?id=" + patient_id + "&name=TestEdit";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
        })
    });
    it("Blank request", function (done) {
        var url = api_url + "/patient/update";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(500);
            done();
        })
    })
});

describe("Patients delete", function () {
    it("Normal request", function (done) {
        var url = api_url + "/patient/delete?id=" + patient_id;
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
        })
    });
    it("Blank request", function (done) {
        var url = api_url + "/patient/delete";
        request(url, function (error, response, body) {
            if (error)
                console.log(error);
            expect(response.statusCode).to.equal(500);
            done();
        })
    })
});
