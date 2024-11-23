import model from "../models/usuariosModel.js"

export const register = async (req, res) => {
    const data = req.body;
    try {
        const result = await model.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const login = async (req, res) => {
    const data = req.body;
    try {
        const result = await model.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}