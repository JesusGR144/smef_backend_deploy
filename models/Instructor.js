import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true        
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
       type: String,
       default: null,
       trim: true
    },
    token: {
       type: String 
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});


const Instructor = mongoose.model('Instructor', instructorSchema);

export default Instructor;