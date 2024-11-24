import model from "../models/usuariosModel.js"
import jwt from "jsonwebtoken"
import bc, { genSalt } from "bcrypt"

export const register = async (req, res) => {
    const { username, email, contraseña, roles_id } = req.body

    try {

        const user = await model.findByEmail(email)
        if (user) {
            return res.status(409).json({ message: "el email ya existe" })
        }

        const salt = await bc.genSalt(10)
        const hashedPassword = await bc.hash(contraseña, salt)

        const newUser = await model.create({ username, email, contraseña: hashedPassword, roles_id });

        const token = jwt.sign({
            email: newUser.details.email
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
            email: user.email
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