import {check} from 'express-validator';
import { User } from '../models/user.js';
import { validateResult } from '../utils/validate.js';

const validateSaveUser = [
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

const validateUpdateUser = [
    check('_id')
        .exists()
        .notEmpty(),
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
        .custom(async (email, meta) => {
            const body = meta.req.body;

            const userId = body._id;

            const user = await User.findOne({ email });
                    
            if (user) {

                if(user._id.valueOf() !== userId) throw new Error('Este correo electrónico ya está en uso.')
            }
        }),
    (req,res,next) => {
        validateResult(req,res,next);
    }
]

export {validateSaveUser, validateUpdateUser}