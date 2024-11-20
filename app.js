import express,{json} from "express"

const app=express()
app.use(express.json())

import productosRoutes from "./src/routes/productosRoutes.js"

app.use("/productos",productosRoutes)

app.listen(3500,()=>{
    console.log("servidor activo")
});


export default app;