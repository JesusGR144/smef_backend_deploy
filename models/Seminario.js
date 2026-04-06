import mongoose from "mongoose";

const seminarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    montoTotal: {
        type: Number,
        required: true
    },    
    fechaLimite: {
        type: Date,
        required: true
    }

},
{
        timestamps: true
    }
);

const Seminario = mongoose.model('Seminario', seminarioSchema);

export default Seminario;