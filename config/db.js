import mongoose from 'mongoose';


export const connectDB = (DB_URI) => {
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
