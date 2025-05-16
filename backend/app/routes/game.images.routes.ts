import { Router } from "express";
import { gameImagesController } from "../controllers";

const gameImagesRouter = Router();

gameImagesRouter.get("/games/images/", gameImagesController.findAllGameImages);
gameImagesRouter.get("/games/images/:id", gameImagesController.findGameImageById);
gameImagesRouter.post("/games/images/", gameImagesController.createNewImage);
gameImagesRouter.put("/games/images/:id", gameImagesController.updateGameImage);
gameImagesRouter.delete("/games/images/:id", gameImagesController.deleteGameImage);

export default gameImagesRouter;