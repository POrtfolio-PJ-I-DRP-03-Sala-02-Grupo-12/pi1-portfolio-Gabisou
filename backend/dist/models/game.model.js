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
exports.deleteGame = exports.updateGame = exports.createNewGame = exports.findById = exports.findAll = void 0;
const connection_1 = __importDefault(require("./connection"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query(`
        SELECT g.id, g.title, g.description, g.link_name, g.link_url,
          i.id, i.title, i.description, i.url
        FROM games AS g
        LEFT JOIN game_images AS i
        ON g.id = i.game_id;
      `);
    return rows;
});
exports.findAll = findAll;
const findById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connection_1.default.query(`
        SELECT g.id, g.title, g.description, g.link_name, g.link_url,
          i.id, i.title, i.description, i.url
        FROM games AS g
        WHERE g.id = ?
        LEFT JOIN game_images AS i
        ON g.id = i.game_id;
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
const createNewGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, linkName, linkUrl } = game;
        const [result] = yield connection_1.default.query(`INSERT INTO games (title, description, linkName, linkUrl)
        VALUES (?, ?, ?, ?);
      `, [title, description, linkName, linkUrl]);
        if (!result)
            return null;
        return Object.assign({ id: result.insertId }, game);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createNewGame = createNewGame;
const updateGame = (gameToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, linkName, linkUrl } = gameToUpdate;
        const [result] = yield connection_1.default.query(`
        UPDATE games
        SET title = ?, description = ?, link_name = ?, link_url = ?
        WHERE id = ?;
      `, [title, description, linkName, linkUrl, id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateGame = updateGame;
const deleteGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_1.default.execute(`
        DELETE FROM games
        WHERE id = ?;
      `, [id]);
        if (!result)
            return null;
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.deleteGame = deleteGame;
