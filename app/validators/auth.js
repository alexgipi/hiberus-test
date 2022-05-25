import {check} from 'express-validator';
import { User } from '../models/user.js';
import { validateResult } from '../utils/validate.js';

const validateRegister = [
    check("name")
        .exists()
        .notEmpty(),
    check("surname")
        .exists()
        .notEmpty(),
    check('email')
        .exists()
        .notEmpty()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email invalido')
        .custom(async (email) => {
            const userExists = await User.findOne({ email });
                    
            if (userExists) {
                throw new Error('Este correo electrónico ya está en uso.')
            }
        }),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 6, max: 25})
        .not()
        .isLowercase()
        .not()
        .isUppercase()
        .not()
        .isAlpha(),
    (req,res,next) => {
        validateResult(req,res,next);
    }

]

const validateLogin = [
    check('email')
        .exists()
        .notEmpty()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email inválido')
        .custom(async (email) => {
            const userExists = await User.findOne({ email });
                    
            if (!userExists) {
                throw new Error('Este email no existe')
            }
        }),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 6, max: 25}),
    (req,res,next) => {
        validateResult(req,res,next);
    }

]

export {validateRegister, validateLogin}