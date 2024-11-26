import db from "../config/database.js"
import moment from "moment"

const getAll = async () => {
    try {
        const sentence = "SELECT * FROM pedidos"
        const [rows] = await db.query(sentence)
        return rows
    } catch (error) {
        throw new Error(error.message)
    }
}


const getById = async (pedido_id) => {
    try {
        const sentence = "SELECT * FROM pedidos WHERE pedido_id=?"
        const [rows] = await db.query(sentence, [pedido_id])
        if (rows.length === 0) {
            throw new Error(`El pedido con ID ${pedido_id} no fue encontrado.`);
        }
        return rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const create = async (data) => {
    try {
        const { num_mesa, user_id } = data;

        const pedido_date = moment().format("YYYY-MM-DD HH:mm:ss")

        const sentence = "INSERT INTO pedidos (pedido_date,num_mesa, user_id) VALUES (?,?,?)";
        const [result] = await db.query(sentence, [pedido_date, num_mesa, user_id]);


        const insertedPedido = await getById(result.insertId);
        return {
            message: `El pedido ${insertedPedido.pedido_id} fue insertado con éxito`,
            details: insertedPedido
        };
    } catch (error) {
        throw new Error(`error al crear el pedido${error.message}`);
    }
};

const updatePedidoStatus = async (pedido_id,status) => {
    try {
        
        const sentence = "UPDATE pedidos SET status=? WHERE pedido_id=?";
        const [result] = await db.query(sentence, [status,pedido_id]);

        if (result.affectedRows === 0) {
            throw new Error(`El pedido con ID ${pedido_id} no fue encontrado.`);
        }

        const updatedStatus = await getById(pedido_id);

       
        return {
            message: `El estado del pedido con ID ${pedido_id} fue actualizado con éxito a ${status}`,
            details: updatedStatus
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getById,
    create,
    updatePedidoStatus,
    getAll
};
