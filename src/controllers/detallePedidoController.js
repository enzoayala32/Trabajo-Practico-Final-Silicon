import detallePedidoModel from "../models/detallePedidoModel.js";

export const getAll = async (req, res) => {
    try {
        const details = await detallePedidoModel.getAll();
        res.status(200).json({ details });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles de los pedidos.', error: error.message });
    }
};

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const detail = await detallePedidoModel.getById(id);
        if (!detail) {
            return res.status(404).json({ message: `Detalle de pedido con ID ${id} no encontrado.` });
        }
        res.status(200).json({ detail });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el detalle del pedido.', error: error.message });
    }
};

export const create = async (req, res) => {
    const data = req.body;
    try {
        const result = await detallePedidoModel.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el detalle de pedido.', error: error.message });
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const result = await detallePedidoModel.update(id, data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el detalle de pedido.', error: error.message });
    }
};

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await detallePedidoModel.deleteOne(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el detalle de pedido.', error: error.message });
    }
};
