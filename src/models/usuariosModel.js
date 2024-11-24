import db from "../config/database.js"

const getById = async (user_id) => {
    try {
        const sentence = "SELECT * FROM usuarios WHERE user_id=?"
        const [rows] = await db.query(sentence, [user_id]);
        if (rows.length === 0) {
            throw new Error(`El usuario con ID ${user_id} no fue encontrado.`)
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

const create = async (data) => {
    try {
        const { username, email, contraseña, roles_id } = data;

        const sentence = "INSERT INTO usuarios (username, email, contraseña ,roles_id ) VALUES (?,?,?,?)";
        const [result] = await db.query(sentence, [username, email, contraseña, roles_id]);


        const insertedUser = await getById(result.insertId);

        // Construir un nuevo objeto sin la contraseña
        const userWithoutPassword = {
            user_id: insertedUser.user_id,
            username: insertedUser.username,
            email: insertedUser.email,
            roles_id: insertedUser.roles_id
        };

        return {
            message: `El usuario ${username} fue insertado con éxito`,
            details: userWithoutPassword
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const findByEmail = async (email) => {
    try {
        const sentence = "SELECT * FROM usuarios WHERE email=?"
        const [rows] = await db.query(sentence,[email])

        return rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}



export default {
    create,
    findByEmail,
};