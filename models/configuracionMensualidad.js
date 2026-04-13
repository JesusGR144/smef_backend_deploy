import mongoose from 'mongoose';

const configuracionSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['adulto', 'niño'],
        required: true,
        unique: true
    },
    monto: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const ConfiguracionMensualidad = mongoose.model('ConfiguracionMensualidad', configuracionSchema);

export default ConfiguracionMensualidad;