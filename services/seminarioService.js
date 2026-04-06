import Seminario from "../models/Seminario.js";
import { asignarSeminario } from "./inscripcionService.js";

const crearSeminario = async (datos) => {
    const seminario = new Seminario(datos);
    const seminarioGuardado = await seminario.save();

    // Asignar seminario automaticamente al crear
    await asignarSeminario(seminario._id);

    return seminarioGuardado;
};

const listarSeminarios = async () => {
    return await Seminario.find();
};

const obtenerPorId = async (id) => {
    const seminario = await Seminario.findById(id);
    if (!seminario) throw new Error("Seminario no encontrado");
    return seminario;
};

const actualizar = async (id, datos) => {
    const seminario = await Seminario.findById(id);
    if (!seminario) throw new Error("Seminario no encontrado");

    // Lógica de negocio: actualización de campos
    seminario.nombre = datos.nombre || seminario.nombre;
    seminario.montoTotal = datos.montoTotal || seminario.montoTotal;
    seminario.fechaLimite = datos.fechaLimite || seminario.fechaLimite;

    return await seminario.save();
};

const eliminar = async (id) => {
    const seminario = await Seminario.findById(id);
    if (!seminario) throw new Error("Seminario no encontrado");
    
    await seminario.deleteOne();
    return { msg: "Seminario eliminado correctamente" };
};

export {
    crearSeminario,
    listarSeminarios,
    obtenerPorId,
    actualizar,
    eliminar
};