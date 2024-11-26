import model from "../models/pedidosModel.js"

export const getAll = async (req, res) => {
    try {
        const pedidos = await model.getAll()
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getById = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await model.getById(id);
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const create = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const result = await model.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const updatePedidoStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body;

    try {
        const result = await model.updatePedidoStatus(id,status); 
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Ha ocurrido un error: ${error.message}` });
    }
};