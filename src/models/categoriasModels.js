import db from "../config/database.js"

const getAll = async () => {
    try {
        const sentence = "SELECT * FROM categorias"
        const [rows] = await db.query(sentence)
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getById = async (categoria_id) => {
    try {
        const sentence = "SELECT * FROM categorias WHERE categoria_id=?"
        const [rows] = await db.query(sentence, [categoria_id])
        if (rows.length === 0) {
            throw new Error(`la categoria con ID ${categoria_id} no fue encontrado.`);
        }
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const create = async (data) => {
    try {
        const { categoria_nombre, categoria_id } = data;

        const sentence = "INSERT INTO categorias(categoria_nombre) VALUES (?)";
        const [result] = await db.query(sentence, [categoria_nombre]);


        const insertedCategory = await getById(result.insertId);
        return {
            message: `la categoria ${categoria_nombre} fue insertado con éxito`,
            details: insertedCategory
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (categoria_id, data) => {
    try {
        const { categoria_nombre } = data
        const sentence = "UPDATE categorias SET categoria_nombre=? WHERE categoria_id=?"
        const [result] = await db.query(sentence, [categoria_nombre, categoria_id])

        if (result.affectedRows === 0) {
            throw new Error(`La categoria con ID ${categoria_id} no fue encontrado.`);
        }

        const updatedProduct = await getById(categoria_id);

        return {
            message: `la categoria ${categoria_nombre} fue actualizado con exito`,
            detail: updatedProduct,
        };
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteOne = async (categoria_id) => {
    try {
        const sentence = "DELETE FROM categorias WHERE categoria_id=?"
        const [result] = await db.query(sentence, [categoria_id])

        if (result.affectedRows === 0) {
            throw new Error(`La categoria con ID ${categoria_id} no fue encontrado.`);
        }
        return {
            message: `La categoria con ID ${categoria_id} fue borrado con éxito.`
        }

    } catch (error) {
        throw error
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};