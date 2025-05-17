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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createNewGame = exports.findGameById = exports.findAllGames = void 0;
const services_1 = require("../services");
const findAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield services_1.gamesService.findAllGames();
        if (games && games.length > 0) {
            res.status(200).json(games);
        }
        else if (typeof games === "string") {
            res.status(404).json({ message: games });
        }
        else {
            res.status(400).json({ message: "Problema na busca por jogos." });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor ao listar jogos: ${error}` });
    }
});
exports.findAllGames = findAllGames;
const findGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const game = yield services_1.gamesService.findGameById(Number(id));
        if (game && typeof game === "object") {
            res.status(200).json(game);
        }
        else if (typeof game === "string") {
            res.status(404).json({ message: game });
        }
        else {
            res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor ao buscar um jogo: ${error}` });
    }
});
exports.findGameById = findGameById;
const createNewGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedGame = req.body;
        const newGame = yield services_1.gamesService.createNewGame(receivedGame);
        if (typeof newGame === "string") {
            res.status(400).json({ message: newGame });
            return;
        }
        res.status(201).json({
            message: "Cadastro realizado com sucesso.",
            game: newGame,
        });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao tentar salvar novo jogo. Erro: ${error}` });
    }
});
exports.createNewGame = createNewGame;
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let receivedGame = req.body;
        const gameToUpdate = yield services_1.gamesService.findGameById(Number(id));
        if (typeof gameToUpdate === "string") {
            res.status(404).json({ message: gameToUpdate });
            return;
        }
        receivedGame = Object.assign(Object.assign({}, gameToUpdate), receivedGame);
        const updatedGame = yield services_1.gamesService.updateGame(receivedGame, Number(id));
        if (updatedGame && typeof updatedGame === "string") {
            res.status(400).json({ message: updatedGame });
            return;
        }
        res.status(202).json({ message: "Cadastro alterado com sucesso", receivedGame });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao alterar dados de jogo. Erro: ${error}` });
    }
});
exports.updateGame = updateGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const gameToExclude = services_1.gamesService.findGameById(Number(id));
        if (gameToExclude && typeof gameToExclude === "string") {
            res.status(404).json({ message: gameToExclude });
            return;
        }
        const exclusionTry = yield services_1.gamesService.deleteGame(Number(id));
        if (exclusionTry && typeof exclusionTry === "string") {
            res.status(400).json({ message: exclusionTry });
            return;
        }
        res.status(202).json({ message: `Dados de jogo com id ${id} apagados com sucesso.` });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao apagar dados de jogo. Erro: ${error}` });
    }
});
exports.deleteGame = deleteGame;
