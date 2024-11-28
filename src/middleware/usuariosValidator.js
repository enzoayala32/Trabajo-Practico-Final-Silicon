import { body, validationResult } from "express-validator";

import model from "../models/usuariosModel.js";

export const validateRegister = () => [
    body("username")
        .notEmpty().withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 3, max: 64 }).withMessage("El nombre de usuario debe tener entre 3 y 64 caracteres")
        .custom(async (username) => {
            const user = await model.findByEmail(username);
            if (user) {
                throw new Error("El nombre de usuario ya está en uso");
            }
            return true;
        }),

    body("email")
        .isEmail().withMessage("El formato del correo electrónico no es válido")
        .normalizeEmail()
        .custom(async (email) => {
            const user = await model.findByEmail(email);
            if (user) {
                throw new Error("El correo electrónico ya está en uso");
            }
            return true;
        }),

    body("contraseña")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
        .matches(/[a-zA-Z]/).withMessage("La contraseña debe contener al menos una letra")
        .matches(/\d/).withMessage("La contraseña debe contener al menos un número")
        .matches(/[@$!%*?&]/).withMessage("La contraseña debe contener al menos un carácter especial"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateLogin = () => [
    body("email")
        .isEmail().withMessage("El formato del correo electrónico no es válido")
        .normalizeEmail(),

    body("contraseña")
        .notEmpty().withMessage("La contraseña es obligatoria"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

