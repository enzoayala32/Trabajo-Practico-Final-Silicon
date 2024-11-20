import db from "../config/database.js"

const getAll = async () => {
    try {
        const sentence = "SELECT * FROM productos"
        const [rows] = await db.query(sentence)
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getById = async (producto_id) => {
    try {
        const sentence = "SELECT * FROM productos WHERE producto_id=?"
        const [rows] = await db.query(sentence, [producto_id])
        if (rows.length === 0) {
            throw new Error(`El producto con ID ${producto_id} no fue encontrado.`);
        }
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const create = async (data) => {
    try {
        const { nombre, descripcion, precio, stock, categoria_id } = data;

        const sentence = "INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?,?,?,?,?)";
        const [result] = await db.query(sentence, [nombre, descripcion, precio, stock, categoria_id]);


        const insertedProduct = await getById(result.insertId);
        return {
            message: `El producto ${nombre} fue insertado con éxito`,
            details: insertedProduct
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (producto_id, data) => {
    try {
        const { nombre, descripcion, precio, stock } = data
        const sentence = "UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE producto_id=?"
        const [result] = await db.query(sentence, [nombre, descripcion, precio, stock, producto_id])

        if (result.affectedRows === 0) {
            throw new Error(`El producto con ID ${producto_id} no fue encontrado.`);
        }

        const updatedProduct = await getById(producto_id);

        return {
            message: `el producto ${nombre} fue actualizado con exito`,
            detail: updatedProduct,
        };
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteOne = async (producto_id) => {
    try {
        const sentence = "DELETE FROM productos WHERE producto_id=?"
        const [result] = await db.query(sentence, [producto_id])

        if (result.affectedRows === 0) {
            throw new Error(`El producto con ID ${producto_id} no fue encontrado.`);
        }
        return {
            message: `El producto con ID ${producto_id} fue borrado con éxito.`
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