import { Router } from "express";
import { gamesController } from "../controllers";

const gamesRouter = Router();

gamesRouter.get("/games/", gamesController.findAllGames);
gamesRouter.get("/games/:id", gamesController.findGameById);
gamesRouter.post("/games/", gamesController.createNewGame);
gamesRouter.put("/games/:id", gamesController.updateGame);
gamesRouter.delete("/games/:id", gamesController.deleteGame);

export default gamesRouter;