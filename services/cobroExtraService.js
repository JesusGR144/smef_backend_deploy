import CobroExtra from "../models/CobroExtra.js";
import Alumno from "../models/alumno.js";

const crearCobroExtra = async (datos) => {
    const alumno = await Alumno.findById(datos.alumno);
    if (!alumno) throw new Error("Alumno no encontrado");
    if (!alumno.estatus) throw new Error("El alumno no está activo");

    const cobro = new CobroExtra(datos);
    return await cobro.save();
};

const obtenerCobrosPorAlumno = async (alumnoId) => {
    return await CobroExtra.find({ alumno: alumnoId })
        .populate('alumno', 'nombre email');
};

const abonarCobroExtra = async (id, abono) => {
    const cobro = await CobroExtra.findById(id);
    if (!cobro) throw new Error("Cobro no encontrado");

    cobro.abono += abono;

    if (cobro.abono >= cobro.montoTotal) {
        cobro.pagado = true;
    }

    return await cobro.save();
};

const liquidarCobroExtra = async (id) => {
    const cobro = await CobroExtra.findById(id);
    if (!cobro) throw new Error("Cobro no encontrado");

    cobro.abono = cobro.montoTotal;
    cobro.pagado = true;

    return await cobro.save();
};

const eliminarCobroExtra = async (id) => {
    const cobro = await CobroExtra.findById(id);
    if (!cobro) throw new Error("Cobro no encontrado");

    await cobro.deleteOne();
    return { msg: "Cobro eliminado correctamente" };
};

export {
    crearCobroExtra,
    obtenerCobrosPorAlumno,
    abonarCobroExtra,
    liquidarCobroExtra,
    eliminarCobroExtra
};