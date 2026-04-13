import Alumno from "../models/alumno.js";
import Mensualidad from "../models/Mensualidad.js";
import ConfiguracionMensualidad from "../models/ConfiguracionMensualidad.js";

const generarMensualidad = async () => {
    const periodoActual = obtenerPeriodoActual();
    const alumnos = await Alumno.find({ estatus: true });

    for (const alumno of alumnos) {
        const existeMensualidad = await Mensualidad.findOne({
            alumno: alumno._id,
            periodo: periodoActual
        });

        if (existeMensualidad) continue;

        const config = await ConfiguracionMensualidad.findOne({ tipo: alumno.tipo });
        if (!config) continue;

        try {
            await Mensualidad.create({
                alumno: alumno._id,
                montoTotal: config.monto,
                periodo: periodoActual
            });
        } catch (error) {
            if (error.code === 11000) {
                continue;
            } else {
                throw error;
            }
        }
    }
};

const aplicarRecargos = async () => {
    const periodoActual = obtenerPeriodoActual();
    const mensualidades = await Mensualidad.find({
        periodo: periodoActual,
        pagado: false
    }).populate('alumno');
    const fechaActual = new Date();

    for (const mensualidad of mensualidades) {
        const diaLimite = new Date(mensualidad.alumno.fechaInicioActivo).getDate();

        const fechaLimite = new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            diaLimite
        );

        if (fechaActual > fechaLimite) {
            const diasVencido = Math.floor((fechaActual - fechaLimite) / (1000 * 60 * 60 * 24));

            if (diasVencido < 5) {
                mensualidad.recargo = 0;
            } else {
                const periodos = Math.floor(diasVencido / 5);
                mensualidad.recargo = periodos * 70;
            }

            await mensualidad.save();
        }
    }
};

const obtenerPeriodoActual = () => {
    const fechaActual = new Date();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    return `${anio}-${mes}`;
};

const registrarAbono = async (id, abono) => {
    const mensualidad = await Mensualidad.findById(id);
    if (!mensualidad) throw new Error("Mensualidad no encontrada");

    mensualidad.abono += abono;

    if (mensualidad.abono >= mensualidad.montoTotal + mensualidad.recargo) {
        mensualidad.pagado = true;
    }

    return await mensualidad.save();
};

const liquidarMensualidad = async (id) => {
    const mensualidad = await Mensualidad.findById(id);
    if (!mensualidad) throw new Error("Mensualidad no encontrada");

    mensualidad.abono = mensualidad.montoTotal + mensualidad.recargo;
    mensualidad.pagado = true;

    return await mensualidad.save();
};

const obtenerMensualidades = async () => {
    return await Mensualidad.find().populate('alumno', 'nombre');
};

export {
    generarMensualidad,
    aplicarRecargos
};