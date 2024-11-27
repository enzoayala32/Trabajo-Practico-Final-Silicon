import db from "../config/database.js";

const getAll = async () => {
    const query = `SELECT * FROM detalle_pedido`;
    const [result] = await db.query(query);
    return result;
};

const getById = async (id) => {
    const query = `SELECT * FROM detalle_pedido WHERE detalle_pedido_id = ?`;
    const [result] = await db.query(query, [id]);
    return result[0];
};

const create = async (data) => {
    try {
        const { pedido_id, producto_id, cantidad, precio_historico } = data;
        const query = `INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_historico) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(query, [pedido_id, producto_id, cantidad, precio_historico]);
        const insertedDetail = await getById(result.insertId); 
        return {
            message: `El detalle de pedido fue insertado con éxito.`,
            details: insertedDetail,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (detalle_pedido_id, data) => {
    try {
        const { pedido_id, producto_id, cantidad, precio_historico } = data;
        const query = `UPDATE detalle_pedido SET pedido_id = ?, producto_id = ?, cantidad = ?, precio_historico = ? WHERE detalle_pedido_id = ?`;
        const [result] = await db.query(query, [pedido_id, producto_id, cantidad, precio_historico, detalle_pedido_id]);

        if (result.affectedRows === 0) {
            throw new Error(`El detalle de pedido con ID ${detalle_pedido_id} no fue encontrado.`);
        }

        const updatedDetail = await getById(detalle_pedido_id); // Obtener el detalle actualizado
        return {
            message: `El detalle de pedido fue actualizado con éxito.`,
            details: updatedDetail,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteOne = async (id) => {
    try {
        const query = `DELETE FROM detalle_pedido WHERE detalle_pedido_id = ?`;
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            throw new Error(`El detalle de pedido con ID ${id} no fue encontrado.`);
        }

        return {
            message: `El detalle de pedido fue eliminado con éxito.`,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};
