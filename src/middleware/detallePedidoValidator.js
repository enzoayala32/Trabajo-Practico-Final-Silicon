import { body, validationResult } from "express-validator";

export const createValidator = () => [
    body('pedido_id').isInt().withMessage('El campo pedido_id debe ser un número entero.'),
    body('producto_id').isInt().withMessage('El campo producto_id debe ser un número entero.'),
    body('cantidad').isInt({ min: 1 }).withMessage('El campo cantidad debe ser un número entero mayor que 0.'),
    body('precio_historico').isDecimal().withMessage('El campo precio_historico debe ser un número decimal válido.')
];

export const updateValidator = () => [
    body('pedido_id').isInt().withMessage('El campo pedido_id debe ser un número entero.'),
    body('producto_id').isInt().withMessage('El campo producto_id debe ser un número entero.'),
    body('cantidad').isInt({ min: 1 }).withMessage('El campo cantidad debe ser un número entero mayor que 0.'),
    body('precio_historico').isDecimal().withMessage('El campo precio_historico debe ser un número decimal válido.')
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
