import mongoose from 'mongoose';

const cobroExtraSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    montoTotal: {
        type: Number,
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

cobroExtraSchema.virtual('saldo').get(function() {
    return this.montoTotal - this.abono;
});

cobroExtraSchema.set('toJSON', { virtuals: true });
cobroExtraSchema.set('toObject', { virtuals: true });

const CobroExtra = mongoose.model('CobroExtra', cobroExtraSchema);

export default CobroExtra;