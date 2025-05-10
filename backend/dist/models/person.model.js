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
exports.findByUserName = exports.findAll = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const people = yield connection_1.default.execute('SELECT * FROM people');
    return people;
});
exports.findAll = findAll;
const findByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield connection_1.default.execute(`SELECT * FROM people WHERE user_name = ?;
        `, [userName]);
        if (!person)
            return null;
        console.log(person[0][0]);
        return person[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findByUserName = findByUserName;
const createNewPerson = (person) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personFound = yield findByUserName(person.userName);
        // if (personFound && personFound.userName === person.userName) return;
    }
    catch (error) {
    }
});
