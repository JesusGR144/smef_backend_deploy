import mongoose from 'mongoose';

const mensualidadSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },    
    montoTotal: {
        type: Number,
        required: true
    },
    recargo: {
        type: Number,
        default: 0
    },
    abono: {
        type: Number,
        required: true,
        default: 0
    },
    pagado: {
        type: Boolean,
        default: false
    },
    periodo: {
        type: String,
        required: true
    }
 },
 {
    timestamps: true
 }
);


mensualidadSchema.index({ alumno: 1, periodo: 1 }, { unique: true });

mensualidadSchema.virtual('saldo').get(function() {
    return this.montoTotal + this.recargo - this.abono;
});

mensualidadSchema.set('toJSON', { virtuals: true });
mensualidadSchema.set('toObject', { virtuals: true });

const Mensualidad = mongoose.model('Mensualidad', mensualidadSchema);

export default Mensualidad;