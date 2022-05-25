import { matchedData } from 'express-validator';
import {User} from '../models/user.js'
import { compare, encrypt } from '../utils/handleBcrypt.js';

import { handleHttpError } from '../utils/handleError.js';
import { tokenSign } from '../utils/handleJwt.js';

import { faker } from '@faker-js/faker';


const register = async (req,res) => {
    
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}

        const user = await User.create(body);
        user.set("password", undefined, {strict:false});


        res.status(200).send({
            user,
            token: await tokenSign(user)
        });
    }catch(e){
        handleHttpError(res, 'Error in register');
    }
        

    
}

const login = async (req,res) => {
    try {
        req = matchedData(req);

        const user = await User.findOne({email: req.email}).select('password email name surname role');

        if(!user){
            handleHttpError(res, 'ERROR_USER_NOT_EXISTS', 404);
            return
        }

        const hashPassword = user.get('password');

        const check = await compare(req.password, hashPassword);

        if(!check){
            handleHttpError(res, 'ERROR_INVALID_PASSWORD', 401);
            return
        }

        user.set('password', undefined, {strict:false})
        res.status(200).send({
            user: user,
            token: await tokenSign(user)
        })

    }catch(e){
        handleHttpError(res, 'ERROR_USER_LOGIN');
    }
}




export {
    register,
    login
}
 
