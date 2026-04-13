import Alumno from "../models/alumno.js";

const crearAlumno = async (datos, instructorId) => {
    const alumno = new Alumno(datos);
    alumno.instructor = instructorId;
    return await alumno.save();
};

const obtenerAlumnos = async () => {
    return await Alumno.find();
};

const obtenerAlumnoPorId = async (id) => {
    const alumno = await Alumno.findById(id);
    if (!alumno) throw new Error("Alumno no encontrado");
    return alumno;
};

const actualizarAlumno = async (id, datos) => {
    const alumno = await Alumno.findById(id);
    if (!alumno) throw new Error("Alumno no encontrado");

    const estabaInactivo = alumno.estatus === false;
    const quiereActivarlo = datos.estatus === true;

    if (estabaInactivo && quiereActivarlo) {
        alumno.fechaInicioActivo = new Date();
    }

    alumno.nombre = datos.nombre || alumno.nombre;
    alumno.email = datos.email || alumno.email;
    alumno.tipo = datos.tipo || alumno.tipo;
    alumno.estatus = datos.estatus ?? alumno.estatus;

    return await alumno.save();
};

const eliminarAlumno = async (id) => {
    const alumno = await Alumno.findById(id);
    if (!alumno) throw new Error("Alumno no encontrado");

    await alumno.deleteOne();
    return { msg: "Alumno eliminado" };
};

export {
    crearAlumno,
    obtenerAlumnos,
    obtenerAlumnoPorId,
    actualizarAlumno,
    eliminarAlumno
};