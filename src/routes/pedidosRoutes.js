import Router from "express"
const router = Router()

import {getAll,getById,create,updatePedidoStatus} from "../controllers/pedidosController.js"

router.get("/", getAll)
router.get("/:id",getById)
router.post("/create",create)
router.put("/update-status/:id",updatePedidoStatus)

export default router