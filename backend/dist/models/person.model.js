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
exports.deletePerson = exports.updatePerson = exports.createNewPerson = exports.findByUserName = exports.findById = exports.findAll = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM people;');
    return rows;
});
exports.findAll = findAll;
const findById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connection_1.default.query(`SELECT * FROM people
        WHERE id = ?;
      `, [idToSearch]);
        if (!rows[0] || rows.length === 0)
            return null;
        return rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findById = findById;
const findByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userName = userName.replace(/"/g, '');
        const [rows] = yield connection_1.default.query(`
          SELECT * FROM people
            WHERE LOWER(user_name) = TRIM(LOWER(?));
        `, [userName]);
        if (!rows[0] || rows.length === 0)
            return null;
        return rows[0];
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findByUserName = findByUserName;
const createNewPerson = (person) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userName, password } = person;
        const [result] = yield connection_1.default.query(`INSERT INTO people (name, user_name, password)
        VALUES (?, ?, ?);
      `, [name, userName, password]);
        if (!result)
            return null;
        return Object.assign({ id: result.insertId }, person);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createNewPerson = createNewPerson;
const updatePerson = (personToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userName, password } = personToUpdate;
        const [result] = (!password || password.length === 0)
            ?
                yield connection_1.default.query(`
          UPDATE people
          SET name = ?, user_name = ?
          WHERE id = ?;
        `, [name, userName, id])
            :
                yield connection_1.default.query(`
          UPDATE people
          SET name = ?, user_name = ?, password = ?
          WHERE id = ?;
        `, [name, userName, password, id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_1.default.query(`
        DELETE FROM people
        WHERE id = ?
      `, [id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deletePerson = deletePerson;
