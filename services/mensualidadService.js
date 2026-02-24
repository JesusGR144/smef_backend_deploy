import Alumno from "../models/alumno.js"
import Mensualidad from "../models/Mensualidad.js";

const generarMensualidad = async () => {

    const periodoActual = obtenerPeriodoActual();

    const alumnos = await Alumno.find({ estatus: true })

    for (const alumno of alumnos) {

        // Validar si el alumno previamente estaba activo antes del periodo actual
        // if(alumno.fechaInicioActivo > new Date()) continue;
        if (!alumno.estatus) continue;

        // Verificar si ya existe mensualidad del periodo
        const existeMensualidad = await Mensualidad.findOne({ alumno: alumno._id, periodo: periodoActual });

        if (existeMensualidad) continue;


        try {
            // Crear mensualidad
            await Mensualidad.create({
                alumno: alumno._id,
                montoTotal: 750,
                periodo: periodoActual
            });
        } catch (error) {
            if (error.code === 11000) {
                // Ya se creó en otro proceso, ignoramos
                continue;
            } else {
                throw error;
            }
        }
    }
}

const aplicarRecargos = async () => {
    const periodoActual = obtenerPeriodoActual();
    const mensualidades = await Mensualidad.find({ periodo: periodoActual, pagado: false }).populate('alumno');
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
}

export {
    generarMensualidad,
    aplicarRecargos
}