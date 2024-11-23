import { body, check, validationResult } from "express-validator";

export const rulesCreate = () => [
    body("categoria_nombre")
        .notEmpty().withMessage("el nombre de la categoría es obligatorio")
        .isString().withMessage("el nombre de la categoría debe ser un texto")
        .isLength({ max: 64 }).withMessage("el nombre de la categoría no puede exceder los 64 caracteres")
];

export const rulesUpdate = () => [
    body("categoria_nombre")
        .notEmpty().withMessage("el nombre de la categoría es obligatorio")
        .isString().withMessage("el nombre de la categoría debe ser un texto")
        .isLength({ max: 64 }).withMessage("el nombre de la categoría no puede exceder los 64 caracteres")
];

export const rulesList = () => [
    check("id")
        .notEmpty().withMessage("el ID no puede ser nulo")
        .isInt().withMessage("el ID debe ser un valor numérico válido")
];


export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
