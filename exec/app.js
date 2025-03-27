"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import dependencies
const cors = require('cors');
const express_1 = __importDefault(require("express"));
//import {Response, Request} from 'express';
//import {doctorsController} from './controllers/doctors.controller';
//import { patientsController } from "./controllers/patients.controller";
// creates an express app
exports.app = (0, express_1.default)();
exports.app.use(cors());
exports.app.use(express_1.default.json());
// defines a dummy route
//app.get('/', (req: Request, res: Response) => {
// res.send("Bonjour tout le monde");
//});
// use the controller to use the route
//app.use('/doctors', doctorsController);
//app.use('/patients', patientsController);
