import { body, param, validationResult } from "express-validator";

export const validateCreatePedido =()=> [
    body("user_id")
        .isInt({ min: 1 }).withMessage("El user_id debe ser un número entero positivo.")
        .notEmpty().withMessage("El user_id es obligatorio."),
    body("num_mesa")
        .isInt({ min: 1 }).withMessage("El número de mesa debe ser un número entero positivo.")
        .notEmpty().withMessage("El número de mesa es obligatorio."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdatePedidoStatus =()=> [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID del pedido debe ser un número entero positivo.")
        .notEmpty().withMessage("El ID del pedido es obligatorio."),
    body("status")
        .isIn(['pendiente', 'completado', 'cancelado'])
        .withMessage("El estado debe ser uno de los siguientes: 'pendiente', 'completado', 'cancelado'.")
        .notEmpty().withMessage("El estado del pedido es obligatorio."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
