import express from "express";
import { createValidator, updateValidator, validate } from "../middleware/detallePedidoValidator.js";
import { getAll, getById, create, update, deleteOne } from "../controllers/detallePedidoController.js";
import { verifyToken, verifyEmpleado } from "../middleware/authUsuarios.js";
const router = express.Router();

router.get("/", verifyToken, verifyEmpleado, getAll);
router.get("/:id", verifyToken, verifyEmpleado, getById);
router.post("/create", verifyToken, verifyEmpleado, createValidator(), validate, create);
router.put("/update/:id", verifyToken, verifyEmpleado, updateValidator(), validate, update);
router.delete("/delete/:id", verifyToken, verifyEmpleado, deleteOne);

export default router;
