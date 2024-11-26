import express,{json} from "express"
import 'dotenv/config'

const app=express()
const port=process.env.PORT
app.use(express.json())

import productosRoutes from "./src/routes/productosRoutes.js"
import categoriasRoutes from "./src/routes/categoriasRoutes.js"
import usuariosRoutes from "./src/routes/usuariosRoutes.js"
import pedidosRoutes from "./src/routes/pedidosRoutes.js"
app.use("/productos",productosRoutes)
app.use("/categorias", categoriasRoutes)
app.use("/usuarios",usuariosRoutes)
app.use("/pedidos",pedidosRoutes)

app.listen(port,()=>{
    console.log(`servidor activo en puerto ${port}`)
});


export default app;