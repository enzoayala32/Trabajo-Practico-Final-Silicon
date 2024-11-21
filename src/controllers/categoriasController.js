import model from "../models/categoriasModels.js"

export const getAll = async (req, res) => {
    try {
        const categorias = await model.getAll()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

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


export const update = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const categorias = await model.getById(id)

    if (!categorias) {
        return res.status(404).json({ message: `categoria con id ${id} no encontrado ` })
    }
    try {
        const result = await model.update(id, data)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`ha surgido el ${error.message} actualizando el categoria `)
    }
}

export const deleteOne = async (req, res) => {
    const id = req.params.id

    try {
        const result = await model.deleteOne(id)
        res.status(200).json({
            message: "categoria eliminado con exito",
            detail: result.message
        })
    } catch (error) {
        res.status(error.status || 500).json({ detail: error.message });
    }
}