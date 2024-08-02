import { check, validationResult } from "express-validator";

export const validatorRegister = [
    check("first_name", "Debes insertar un valor en el campo first_name").not().isEmpty(),
    check("last_name", "Debes insertar un valor en el campo last_name").exists().isEmpty(),
    check("email", "Debes insertar un email válido").exists().isEmail(),
    check("password").exists().isLength({ min: 8 }),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(404).send(error);
        }
    },
];