import express from "express";
import { createValidator, updateValidator, validate } from "../middleware/detallePedidoValidator.js";
import { getAll, getById, create, update, deleteOne } from "../controllers/detallePedidoController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", createValidator(), validate, create);
router.put("/update/:id", updateValidator(), validate, update);
router.delete("/delete/:id", deleteOne);

export default router;
