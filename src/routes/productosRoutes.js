import Router from "express";
const router = Router();

import{getAll,create,update,deleteOne} from "../controllers/productosController.js"

router.get("/",getAll)
router.post("/create",create)
router.put("/update/:id",update)
router.delete('/delete/:id',deleteOne)

export default router