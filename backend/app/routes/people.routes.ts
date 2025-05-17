import { Router } from "express";
import { peopleController } from "../controllers";
import validateToken from "../middlewares/validateToken";

const peopleRouter = Router();

peopleRouter.get("/people/search", peopleController.findPersonByUserName);
peopleRouter.get("/people/", peopleController.findAllPeople);
peopleRouter.get("/people/:id", peopleController.findPersonById);
peopleRouter.post("/people/", peopleController.createNewPerson);
peopleRouter.put("/people/:id", validateToken, peopleController.updatePerson);
peopleRouter.delete("/people/:id", validateToken, peopleController.deletePerson);
peopleRouter.post("/people/login/", peopleController.login);
peopleRouter.post("/people/test-token/", validateToken, peopleController.testTokenIsActive);

export default peopleRouter;