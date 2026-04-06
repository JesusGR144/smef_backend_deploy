import InscripcionSeminario from "../models/inscripcionSeminario.js";
import Alumno from "../models/alumno.js";
import Seminario from "../models/Seminario.js";

const asignarSeminario = async (seminarioId) => {
    const seminario = await Seminario.findById(seminarioId);
    if (!seminario) throw new Error("Seminario no encontrado");

    const fechaLimiteAntiguedad = new Date();
    fechaLimiteAntiguedad.setMonth(fechaLimiteAntiguedad.getMonth() - 3);

    const alumnos = await Alumno.find({
        estatus: true,
        fechaInicioActivo: { $lte: fechaLimiteAntiguedad }
    });

    for (const alumno of alumnos) {
        const existeInscripcion = await InscripcionSeminario.findOne({
            seminario: seminarioId,
            alumno: alumno._id
        });

        if (existeInscripcion) continue;

        try {
            await InscripcionSeminario.create({
                seminario: seminarioId,
                alumno: alumno._id
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

const obtenerInscripcionesPorSeminario = async (seminarioId) => {
    return await InscripcionSeminario.find({ seminario: seminarioId })
        .populate('alumno', 'nombre email')
        .populate('seminario', 'nombre montoTotal fechaLimite');
};

const abonarInscripcion = async (id, abono) => {
    const inscripcion = await InscripcionSeminario.findById(id)
        .populate('seminario', 'montoTotal');

    if (!inscripcion) throw new Error("Inscripción no encontrada");

    inscripcion.abono += abono;

    if (inscripcion.abono >= inscripcion.seminario.montoTotal) {
        inscripcion.pagado = true;
    }

    return await inscripcion.save();
};

const liquidar = async (id) => {
    const inscripcion = await InscripcionSeminario.findById(id)
        .populate('seminario', 'montoTotal');

    if (!inscripcion) throw new Error("Inscripción no encontrada");

    inscripcion.abono = inscripcion.seminario.montoTotal;
    inscripcion.pagado = true;

    return await inscripcion.save();
};

const eliminarInscripcion = async (id) => {
    const inscripcion = await InscripcionSeminario.findById(id);
    if (!inscripcion) throw new Error("Inscripción no encontrada");

    await inscripcion.deleteOne();
    return { msg: "Inscripción eliminada correctamente" };
};

export {
    asignarSeminario,
    obtenerInscripcionesPorSeminario,
    abonarInscripcion,
    liquidar,
    eliminarInscripcion
};