import mongoose from 'mongoose';
import recordatorioCumple from '../helpers/recordatorioCumple.js';

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fechaRegistro: {
        type: Date,
        required: true,
        default: Date.now()
    },
    fechaCumple: {
        type: Date
    },
    estatus: {
        type: Boolean,
        default: true
    },    
    fechaBaja: {
        type: Date,
        default: null
    },
    haSidoBaja: {
        type: Boolean,
        default: false
    },
    fechaInicioActivo: {
        type: Date,
        default: Date.now
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    }
},
    {
        timestamps: true
    }
);


alumnoSchema.virtual('esCumple').get(function () {
    return recordatorioCumple(this.fechaCumple) !== null;
});

alumnoSchema.virtual('edadCumple').get(function () {
    return recordatorioCumple(this.fechaCumple);
});

alumnoSchema.set('toJSON', { virtuals: true });
alumnoSchema.set('toObject', { virtuals: true });

const Alumno = mongoose.model('Alumno', alumnoSchema);

export default Alumno;