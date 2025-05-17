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
exports.deleteGameImage = exports.updateGameImage = exports.createNewImage = exports.findGameImageById = exports.findAllGameImages = void 0;
const services_1 = require("../services");
const findAllGameImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gamesImages = yield services_1.gameImagesService
            .findAllGameImages();
        if (gamesImages && gamesImages.length > 0) {
            res.status(200).json(gamesImages);
        }
        else if (typeof gamesImages === "string") {
            res.status(404).json({ message: gamesImages });
        }
        else {
            res.status(400).json({ message: "Problema na busca por imagens de jogos." });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Erro no servidor ao listar imagens de jogos: ${error}`
        });
    }
});
exports.findAllGameImages = findAllGameImages;
const findGameImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const image = yield services_1.gameImagesService
            .findGameImageById(Number(id));
        if (image && typeof image === "object") {
            res.status(200).json(image);
        }
        else if (typeof image === "string") {
            res.status(404).json({ message: image });
        }
        else {
            res.status(400).json({ message: `Problema na busca pelo id ${id}.` });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor ao buscar uma imagem: ${error}` });
    }
});
exports.findGameImageById = findGameImageById;
const createNewImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receivedImage = req.body;
        const newGameImage = yield services_1.gameImagesService.createNewImage(receivedImage);
        if (typeof newGameImage === "string") {
            res.status(400).json({ message: newGameImage });
            return;
        }
        res.status(201).json({
            message: "Cadastro realizado com sucesso.",
            game: newGameImage,
        });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao tentar salvar nova imagem. Erro: ${error}` });
    }
});
exports.createNewImage = createNewImage;
const updateGameImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let receivedGameImage = req.body;
        const imageToUpdate = yield services_1.gameImagesService.findGameImageById(Number(id));
        if (typeof imageToUpdate === "string") {
            res.status(404).json({ message: imageToUpdate });
            return;
        }
        receivedGameImage = Object.assign(Object.assign({}, imageToUpdate), receivedGameImage);
        const updatedImage = yield services_1.gameImagesService
            .updateGameImage(receivedGameImage, Number(id));
        if (updatedImage && typeof updatedImage === "string") {
            res.status(400).json({ message: updatedImage });
            return;
        }
        res.status(202).json({ message: "Cadastro alterado com sucesso", receivedGameImage });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao alterar dados da imagem. Erro: ${error}` });
    }
});
exports.updateGameImage = updateGameImage;
const deleteGameImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const imageToExclude = services_1.gameImagesService.findGameImageById(Number(id));
        if (imageToExclude && typeof imageToExclude === "string") {
            res.status(404).json({ message: imageToExclude });
            return;
        }
        const exclusionTry = yield services_1.gameImagesService.deleteGameImage(Number(id));
        if (exclusionTry && typeof exclusionTry === "string") {
            res.status(400).json({ message: exclusionTry });
            return;
        }
        res.status(202).json({ message: `Dados de imagem com id ${id} apagados com sucesso.` });
    }
    catch (error) {
        res.status(500).json({ mesage: `Erro ao apagar dados de imagem. Erro: ${error}` });
    }
});
exports.deleteGameImage = deleteGameImage;
