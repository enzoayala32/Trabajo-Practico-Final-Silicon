import Router from "express"
const router = Router()

import { register, login, profile, getAll, updateRoles } from "../controllers/usuariosController.js"
import { validateLogin, validateRegister, verifyAdmin, verifyToken } from "../middleware/usuariosValidator.js"

router.post("/register", validateRegister(), register)
router.post("/login", validateLogin(), login)
router.get("/profile", verifyToken, profile)

//administrador
router.get("/", verifyToken, verifyAdmin, getAll)
router.put("/update-roles/:id", verifyToken, verifyAdmin, updateRoles)
export default router
