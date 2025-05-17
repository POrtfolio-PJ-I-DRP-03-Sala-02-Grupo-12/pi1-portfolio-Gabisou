"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameImagesRouter = exports.gamesRouter = exports.peopleRouter = void 0;
const people_routes_1 = __importDefault(require("./people.routes"));
exports.peopleRouter = people_routes_1.default;
const games_routes_1 = __importDefault(require("./games.routes"));
exports.gamesRouter = games_routes_1.default;
const game_images_routes_1 = __importDefault(require("./game.images.routes"));
exports.gameImagesRouter = game_images_routes_1.default;
