"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientsController = void 0;
const express_1 = require("express");
const guards_1 = require("../utils/guards");
exports.patientsController = (0, express_1.Router)();
// Static mock data
const patients = [{
        id: 1,
        firstName: "John", lastName: "Lecarre",
        birthDate: new Date("1964-05-11"), niss: "640511-123-45",
        address: {
            street: "Rue du polar", number: "273-B",
            zipCode: "1200", city: "Bruxelles", country: "Belgique"
        },
        refDoctor: 1
    },
    {
        id: 2,
        firstName: "Gabrielle", lastName: "Garcias Marques",
        birthDate: new Date("1978-12-03"), niss: "781203-123-45",
        address: {
            street: "Rue de l'émerveillement", number: "56",
            zipCode: "1000", city: "Bruxelles", country: "Belgique"
        },
        refDoctor: 2
    }, {
        id: 3,
        firstName: "Abdel", lastName: "Kader",
        birthDate: new Date("1980-02-28"), niss: "800228-123-45",
        address: {
            street: "Rue de la liberté", number: "1",
            zipCode: "7000", city: "Mons", country: "Belgique"
        },
        refDoctor: 2,
    }];
/**
 * GET /patients/
 * Get all patients without filtering
 */
exports.patientsController.get('/', (req, res) => {
    console.log('[GET] /patients/');
    return res.status(200).json(patients);
});
/**
 * GET /patients/:id
 * Get a patient by its id
 */
exports.patientsController.get('/:id', (req, res) => {
    console.log('[GET] /patients/:id');
    // extracts the id from the parameters of the request
    const id = parseInt(req.params.id);
    // check if the id is a number
    if (!(0, guards_1.isNumber)(id)) {
        // id is not a number, return 400
        return res.status(400).json({ error: `Invalid id: ${req.params.id}` });
    }
    // find the patient
    let patientIndex = -1;
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].id === id) {
            patientIndex = i;
            break;
        }
    }
    // check if the patient has been found
    if (patientIndex === -1) {
        // no patient found, return 404
        return res.status(404).json({ error: `Patient ${id} not found` });
    }
    // send the response with 200 status code
    return res.status(200).json(patients[patientIndex]);
});
/**
 * GET /patients/niss/:niss
 * Get a patient by its niss
 */
exports.patientsController.get('/niss/:niss', (req, res) => {
    console.log('[GET] /patients/niss/:niss');
    // extract the niss number from the request's parameters
    const niss = req.params.niss;
    // check if this is a valid niss number
    if (!(0, guards_1.isNiss)(niss)) {
        return res.status(400).json({ error: `Invalid niss: ${niss}` });
    }
    // find the patient with the given niss
    let patientIndex = -1;
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].niss === niss) {
            patientIndex = i;
            break;
        }
    }
    // check if the patient has been found
    if (patientIndex === -1) {
        return res.status(404).json({ error: `Patient with niss ${niss} not found` });
    }
    // send the response with 200 status code
    return res.status(200).json(patients[patientIndex]);
});
/**
 * GET /patients/doctor/:id
 * Get all patients with the given doctor id
 */
exports.patientsController.get('/doctor/:id', (req, res) => {
    console.log('[GET] /patients/doctor/:id');
    // extract the id from the request's parameters
    const id = parseInt(req.params.id);
    // check if the id is a number
    if (!(0, guards_1.isNumber)(id)) {
        return res.status(400).json({ error: `Invalid id: ${req.params.id}` });
    }
    // find the patients with the given doctor id
    const results = [];
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].refDoctor === id) {
            results.push(patients[i]);
        }
    }
    // send the response with 200 status code
    return res.status(200).json(results);
});
/**
 * GET /patients/zipcode/:zipcode
 * Get all patients with the given zip code
 */
exports.patientsController.get('/zipcode/:zipcode', (req, res) => {
    console.log('[GET] /zipcode/:zipcode');
    // extract the zipcode from the request's parameters
    const zipcode = req.params.zipcode;
    if (!(0, guards_1.isString)(zipcode)) {
        return res.status(400).json({ error: `Invalid zip code: ${zipcode}` });
    }
    // find the patients with the given zip code
    const results = [];
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].address.zipCode === zipcode) {
            results.push(patients[i]);
        }
    }
    // send the response with 200 status code
    return res.status(200).json(results);
});
/**
 * GET /patients/doctor/:id/zipcode/:zipcode
 * Get all patients with the given doctor id and zipcode
 */
exports.patientsController.get('/doctor/:id/zipcode/:zipcode', (req, res) => {
    console.log('[GET] /patients/doctor/:id/zipcode/:zipcode');
    // extract the id from the request's parameters
    const id = parseInt(req.params.id);
    if (!(0, guards_1.isNumber)(id)) {
        return res.status(400).json({ error: `Invalid id: ${req.params.id}` });
    }
    // extract the zipcode from the request's parameters
    const zipcode = req.params.zipcode;
    if (!(0, guards_1.isString)(zipcode)) {
        return res.status(400).json({ error: `Invalid zipcode: ${zipcode}` });
    }
    // find the patients with the given doctor id and zipcode
    const results = [];
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].refDoctor === id && patients[i].address.zipCode === zipcode) {
            results.push(patients[i]);
        }
    }
    // send the response with 200 status code
    return res.status(200).json(results);
});
