import Router from "express"
const router = Router()

import { register, login, profile } from "../controllers/usuariosController.js"
import { verifyToken } from "../middleware/usuariosValidator.js"

router.post("/register", register)
router.post("/login", login)
router.get("/profile", verifyToken, profile)

export default router
