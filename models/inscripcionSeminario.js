import mongoose from "mongoose";

const inscripcionSeminarioSchema = new mongoose.Schema({
    seminario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seminario',
        required: true
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    abono: {
        type: Number,
        default: 0
    },
    pagado: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

inscripcionSeminarioSchema.index({ seminario: 1, alumno: 1 }, { unique: true });

inscripcionSeminarioSchema.virtual('saldo').get(function () {
    return this.seminario.montoTotal - this.abono;
});

inscripcionSeminarioSchema.set('toJSON', { virtuals: true });
inscripcionSeminarioSchema.set('toObject', { virtuals: true });

const InscripcionSeminario = mongoose.model('InscripcionSeminario', inscripcionSeminarioSchema);

export default InscripcionSeminario;