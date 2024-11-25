import model from "../models/usuariosModel.js"
import jwt from "jsonwebtoken"
import bc, { genSalt } from "bcrypt"

export const register = async (req, res) => {
    const { username, email, contraseña } = req.body

    try {

        const user = await model.findByEmail(email)
        if (user) {
            return res.status(409).json({ message: "el email ya existe" })
        }

        const salt = await bc.genSalt(10)
        const hashedPassword = await bc.hash(contraseña, salt)

        const newUser = await model.create({ username, email, contraseña: hashedPassword});

        const token = jwt.sign({
            email: newUser.details.email,
            roles_id:newUser.details.roles_id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(201).json({ message: token });

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const login = async (req, res) => {

    try {
        const { email, contraseña } = req.body;

        const user = await model.findByEmail(email)

        if (!user) {
            return res.status(404).json({ message: "el usuario no existe" })
        }

        const coincide = await bc.compare(contraseña, user.contraseña)

        if (!coincide) {
            return res.status(401).json({ message: "contraseña invalida" })
        }

        const token = jwt.sign({
            email: user.email,
            roles_id:user.roles_id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({ message: token });

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const profile=async(req,res)=>{
    try {
        
       const user= await model.findByEmail(req.email)

     return res.status(200).json({message:user})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAll=async(req,res)=>{
    try {
        const users = await model.getAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updateRoles = async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await model.updateRoles(id); 
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Ha ocurrido un error: ${error.message}` });
    }
};