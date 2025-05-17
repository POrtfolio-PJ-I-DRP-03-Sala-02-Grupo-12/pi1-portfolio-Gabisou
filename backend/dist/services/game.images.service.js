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
const models_1 = require("../models");
const findAllGameImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImages = yield models_1.gameImageModel.findAll();
        if (!gameImages || gameImages.length === 0)
            return 'Não encontramos imagens cadastradas';
        return gameImages;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error}`;
    }
});
exports.findAllGameImages = findAllGameImages;
const findGameImageById = (idToSearch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameImage = yield models_1.gameImageModel.findById(idToSearch);
        if (!gameImage || gameImage === null) {
            return `Não conseguimos encontrar o jogo pelo id ${idToSearch}`;
        }
        return gameImage;
    }
    catch (error) {
        return `Ocorreu um erro na busca: ${error}`;
    }
});
exports.findGameImageById = findGameImageById;
const createNewImage = (gameImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGameImage = yield models_1.gameImageModel.createNewImage(gameImage);
        if (!newGameImage || !newGameImage.id || newGameImage === null) {
            return `Não foi possível cadastrar a imagem com os seguintes dados:
        título: ${gameImage.title}
        descrição: ${gameImage.description}
        url: ${gameImage.url}
        id do jogo relacionado: ${gameImage.gameId}
      `;
        }
        return newGameImage;
    }
    catch (error) {
        return `Ocorreu um erro no registro de nova imagem: ${error}`;
    }
});
exports.createNewImage = createNewImage;
const updateGameImage = (imageToUpdate, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedImage = yield models_1.gameImageModel
            .updateImage(imageToUpdate, id);
        if (!updatedImage)
            return `Não foi possível alterar os dados da imagem com o id ${id}`;
        return updatedImage;
    }
    catch (error) {
        return `Ocorreu um erro na alteração de dados da imagem. ${error}`;
    }
});
exports.updateGameImage = updateGameImage;
const deleteGameImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excludedImage = yield models_1.gameImageModel.deleteImage(id);
        if (!excludedImage) {
            return `Não foi possível excluir dados da imagem com o id ${id}`;
        }
        return excludedImage;
    }
    catch (error) {
        return `Ocorreu um erro ao tentar excluir a imagem do banco de dados. ${error}`;
    }
});
exports.deleteGameImage = deleteGameImage;
