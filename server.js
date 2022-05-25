import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {connectDB} from './config/db.js';
const app = express();

const port = process.env.PORT;

import {authRoutes} from './app/routes/auth.js';
import {userRoutes} from './app/routes/user.js';


import bodyParser from 'body-parser';



app.use(
    bodyParser.json({
        limit: '50mb'
    })
)

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  
    next();
});

app.use(userRoutes);
app.use(authRoutes);

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port)
})

connectDB();