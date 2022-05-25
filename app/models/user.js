import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(    {
        email: {type: String,unique: true,required: true},
        password: {type: String, required:true, select:false},
        name: {type: String, required:true},
        surname: {type: String, required:true},
        role: {type: String}
    },{timestamps:true}
)

export const User = mongoose.model('user', UserSchema);