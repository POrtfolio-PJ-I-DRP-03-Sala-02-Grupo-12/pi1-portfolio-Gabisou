"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./models/connection"));
const { personModel } = require('./models');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, _res, next) => {
    req.db = connection_1.default;
    next();
});
app.get('/people/:userName', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = (req.params.userName);
    const person = yield personModel.findByUserName(userName);
    res.status(200).json(person);
}));
exports.default = app;
