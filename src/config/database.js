import { createPool } from "mysql2/promise";
import 'dotenv/config';
const configuracion = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
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