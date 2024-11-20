import { createPool } from "mysql2/promise";

const configuracion = {
    host: "localhost",
    user: "root",
    database: "cafeteria",
    password: "admin",
    waitForConnections: true
}

const db = createPool(configuracion)

async function verificarConexion() {
    try {
        const [rows] = await db.query("SELECT 1")
        console.log("base de datos conectada")
    } catch (error) {
        console.log("error al conectar a la base de datos")
    }
}
verificarConexion()

export default db;