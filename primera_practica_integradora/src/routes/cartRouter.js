import { Router } from "express";
import { save, getOne, update } from "../controllers/cartController.js";

const cartRouter = Router();    

cartRouter.get("/:pid", getOne);
cartRouter.post("/", save);
cartRouter.post("/:cid/product/:pid",update);

export default cartRouter;
