import { Router } from "express";
import { peopleController } from "../controllers";

const peopleRouter = Router();

peopleRouter.get("/people/search", peopleController.findPersonByUserName);
peopleRouter.get("/people/", peopleController.findAllPeople);
peopleRouter.get("/people/:id", peopleController.findPersonById);
peopleRouter.post("/people/", peopleController.createNewPerson);
peopleRouter.put("/people/:id", peopleController.updatePerson);
peopleRouter.delete("/people/:id", peopleController.deletePerson);

export default peopleRouter;