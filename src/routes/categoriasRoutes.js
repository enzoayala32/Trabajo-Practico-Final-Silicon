import Router from "express";
const router = Router();

import { getAll, create, update, deleteOne, getById } from "../controllers/categoriasController.js"
import { rulesCreate, rulesUpdate, rulesList, validate } from "../middleware/categoriasValidator.js"
import { verifyToken, verifyAdmin } from "../middleware/authUsuarios.js";

router.get("/", getAll)
router.get('/:id', rulesList(), validate, getById)

router.post("/create", verifyToken, verifyAdmin, rulesCreate(), validate, create)
router.put("/update/:id", verifyToken, verifyAdmin, rulesUpdate(), validate, update)
router.delete('/delete/:id', verifyToken, verifyAdmin, deleteOne)

export default router