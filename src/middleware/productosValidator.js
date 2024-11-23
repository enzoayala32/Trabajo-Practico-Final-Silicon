import { body, check, validationResult } from "express-validator";

export const rulesCreate = () => [
    body("nombre")
        .notEmpty().withMessage("el producto debe tener un nombre")
        .isString().withMessage("el nombre del producto debe ser un texto")
        .isLength({ max: 64 }).withMessage("el nombre no puede excederlos 64 caracteres"),

    body("descripcion")
        .optional()
        .isString().withMessage("la descripcion debe ser un texto")
        .isLength({ max: 255 }).withMessage("la descripcion no debe exceder los 255 caracteres"),

    body("precio")
        .notEmpty().withMessage("el precio es obligatorio")
        .isFloat({ min: 0 }).withMessage("el precio debe ser un numero mayor o igual a 0"),

    body("stock")
        .notEmpty().withMessage("el stock es obligatorio")
        .isInt({ min: 0 }).withMessage("el stock debe ser un número entero mayor o igual a 0 "),

    body("categoria_id")
        .notEmpty().withMessage("la categoria es obligatoria")
        .isInt({ min: 1 }).withMessage("el stock debe ser un número entero valido ")
]

export const rulesUpdate = () => [
    body("nombre")
        .notEmpty().withMessage("El nombre del producto es obligatorio")
        .isString().withMessage("El nombre del producto debe ser un texto")
        .isLength({ max: 64 }).withMessage("El nombre no puede exceder los 64 caracteres"),
    body("descripcion")
        .optional()
        .isString().withMessage("La descripción debe ser un texto")
        .isLength({ max: 255 }).withMessage("La descripción no debe exceder los 255 caracteres"),
    body("precio")
        .notEmpty().withMessage("El precio es obligatorio")
        .isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0"),
    body("stock")
        .notEmpty().withMessage("El stock es obligatorio")
        .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),
    body("categoria_id")
        .notEmpty().withMessage("La categoría es obligatoria")
        .isInt({ min: 1 }).withMessage("La categoría debe ser un número entero válido")
]

// Reglas para listar o buscar un producto por id
export const rulesList = () => [
    check("id")
        .notEmpty().withMessage("El ID no puede ser nulo")
        .isInt().withMessage("El ID debe ser un valor numérico válido")
]

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
