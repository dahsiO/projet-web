"use strict";
/**
 * This file contains all the logic for the doctors controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsController = void 0;
const express_1 = require("express");
const guards_1 = require("../utils/guards");
exports.doctorsController = (0, express_1.Router)();
// This is a static mock array of doctors
const doctors = [
    { id: 1, firstName: "Jules", lastName: "Valles", speciality: "Cardiologue" },
    { id: 2, firstName: "Safouane", lastName: "Van Brussels", speciality: "General Practicien" },
    { id: 3, firstName: "Paola", lastName: "Sanchez", speciality: "Pneumologue" },
];
/**
 * This function returns all the doctors
 */
exports.doctorsController.get("/", (req, res) => {
    console.log("[GET] /doctors/");
    res.status(200).json(doctors);
});
/**
 * This function returns a specific doctor
 */
exports.doctorsController.get("/:id", (req, res) => {
    console.log("[GET] /doctors/:id");
    const id = parseInt(req.params.id);
    if (!(0, guards_1.isNumber)(id)) {
        res.status(400).send("Invalid id");
        return;
    }
    let doctorIndex = -1;
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].id === id) {
            doctorIndex = i;
            break;
        }
    }
    if (doctorIndex === -1) {
        res.status(404).send("Doctor not found");
        return;
    }
    res.status(200).json(doctors[doctorIndex]);
});
