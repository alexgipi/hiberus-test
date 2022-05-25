import mongoose from 'mongoose';

const DB_NAME = 'hiberus_test_db';

const DB_URI = `mongodb://localhost:27017/${DB_NAME}`;


export const connectDB = () => {
    mongoose.connect(
        DB_URI,
        {
            keepAlive:true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        },
        (err) => {
            if(err) console.log("Error en la BD")
            else console.log('Conexión con la BD realizada correctamente.')
        }
    )
}
