import {User} from '../models/user.js'
import { handleHttpError } from '../utils/handleError.js';
import { encrypt } from '../utils/handleBcrypt.js';
import { faker } from '@faker-js/faker';

const saveUser = async (req,res) => {
    const data = req.body;

    try {
        const user = await User.create(data);
        res.status(200).send({user})
    }catch(e){
        handleHttpError(res, 'Error in saveUser');
    }
    
}

const getUser = async (req,res) => {
    const {id} = req.params;
    
    try {
        const user = await User.findOne({_id: id});
        res.send({user})
    }catch(e){
        handleHttpError(res, 'Error in getUser');
    }
}

const getUsers = async (req,res) => {
    const {limit = 5, page = 1} = req.params;

    let skip = page - 1;

	skip = skip * limit;
    try {
        const users = await User.find({}).skip(skip).limit(Number(limit));


        res.status(200).send({users});

        
    }catch(e){
        handleHttpError(res, 'Error in getUsers');
    }

    
}

const updateUser = async (req,res) => {
    const {id} = req.params;
    const update = req.body;

    try {
        const userUpdated = await User.findByIdAndUpdate({_id:id}, update, {new:true});
        res.send({user: userUpdated})
    }catch(e){
        handleHttpError(res, 'Error in updateUser');
    }

    
}

const deleteUser = async (req,res) => {
    const {id} = req.params;

    try {
        const userDeleted = await User.findByIdAndDelete(id);
        res.status(200).send({
            deleted: true,
            user: userDeleted
        })
    }catch(e){
        handleHttpError(res, 'Error in deleteUser');
    }

    
}



const createFakeUsers = async (req, res) => {
    try {
        const numItems = req?.params.numItems || 10;

        let users = [];

        for (let index = 0; index < numItems; index++) {
            const randomName = faker.name.findName(); // Rowan Nikolaus
            const name = randomName.split(' ')[0];
            const surname = randomName.split(' ')[1];

            const email = faker.internet.email().toLowerCase(); // Kassandra.Haley@erich.biz

            let data = {
                name,
                surname,
                email,
                password: 'MasterPassword123'
            }
            
            const password = await encrypt(data.password);
            
            const body = {...data, password}
    
            console.log(body)
            const user = await User.create(body);

            if(user){
                users.push(user);
            }
            
        }
        
        res?.status(200).send({
            users
        })
        // const user = await User.create(body);


    }catch(e){
        handleHttpError(res, 'Error in register');
    }
    
}

// createFakeUsers();


export {
    saveUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}
 
