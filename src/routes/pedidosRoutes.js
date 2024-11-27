import Router from "express"
const router = Router()

import {getAll,getById,create,updatePedidoStatus} from "../controllers/pedidosController.js"
import { validateCreatePedido, validateUpdatePedidoStatus } from "../middleware/pedidosValidator.js"

router.get("/", getAll)
router.get("/:id",getById)
router.post("/create", validateCreatePedido(), create)
router.put("/update-status/:id", validateUpdatePedidoStatus(), updatePedidoStatus)

export default router