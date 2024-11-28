import Router from "express"
const router = Router()

import { getAll, getById, create, updatePedidoStatus } from "../controllers/pedidosController.js"
import { validateCreatePedido, validateUpdatePedidoStatus } from "../middleware/pedidosValidator.js"
import { verifyEmpleado, verifyToken } from "../middleware/authUsuarios.js"
router.get("/", verifyToken, verifyEmpleado, getAll)
router.get("/:id", verifyToken, verifyEmpleado, getById)
router.post("/create", verifyToken, verifyEmpleado, validateCreatePedido(), create)
router.put("/update-status/:id", verifyToken, verifyEmpleado, validateUpdatePedidoStatus(), updatePedidoStatus)

export default router