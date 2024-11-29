import db from "../config/database.js"

const getAll = async () => {
    try {
        const sentence = "SELECT * FROM usuarios"
        const [rows] = await db.query(sentence)
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

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
        const { username, email, contraseña } = data;

        const sentence = "INSERT INTO usuarios (username, email, contraseña ) VALUES (?,?,?)";
        const [result] = await db.query(sentence, [username, email, contraseña]);


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

const findByUsername = async (username) => {
    try {
        const sentence = "SELECT * FROM usuarios WHERE username=?"
        const [rows] = await db.query(sentence,[username])

        return rows[0]
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateRoles = async (user_id) => {
    try {
        
        const sentence = "UPDATE usuarios SET roles_id = 2 WHERE user_id=?";
        const [result] = await db.query(sentence, [user_id]);

        if (result.affectedRows === 0) {
            throw new Error(`El usuario con ID ${user_id} no fue encontrado.`);
        }

        const updatedUser = await getById(user_id);

       
        return {
            message: `El rol del usuario con ID ${user_id} fue actualizado con éxito a rol 2`,
            details: updatedUser
        };
    } catch (error) {
        throw new Error(error.message);
    }
};




export default {
    create,
    findByEmail,
    findByUsername,
    getAll,
    updateRoles
};