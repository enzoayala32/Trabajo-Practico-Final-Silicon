import Router from "express";
const router = Router();

import { getAll, create, update, deleteOne , getById } from "../controllers/productosController.js"
import { rulesCreate, rulesUpdate, rulesList, validate } from "../middleware/productosValidator.js"

router.get("/", getAll)
router.get('/:id', rulesList(), validate, getById);
router.post("/create", rulesCreate(), validate, create)
router.put("/update/:id", rulesUpdate(), validate, update)
router.delete('/delete/:id', deleteOne)

export default router