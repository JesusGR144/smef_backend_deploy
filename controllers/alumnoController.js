import Alumno from '../models/alumno.js';
import { generarMensualidad, aplicarRecargos } from '../services/mensualidadService.js';

const registrarAlumno = async (req, res) => {
    const alumno = new Alumno(req.body);
    alumno.instructor = req.instructor._id;

    try {
        const alumnoAlmacenado = await alumno.save();
        res.json({ alumnoAlmacenado });
    } catch (error) {
        console.log(error.message);
    }
};

const obtenerAlumnos = async (req, res) => {

    await generarMensualidad();
    await aplicarRecargos();

    const alumnos = await Alumno.find();

    res.json(alumnos);
};


const obtenerAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }

    res.json(alumno);
};

const actualizarAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        res.status(404).json({ msg: "Alumno no encontrado" });
    }

    const estabaInactivo = alumno.estatus === false;
    const quiereActivarlo = req.body.estatus === true;

    // Reactivación detectada
    if (estabaInactivo && quiereActivarlo) {
        alumno.fechaInicioActivo = new Date();
    }


    alumno.nombre = req.body.nombre || alumno.nombre;
    alumno.email = req.body.email || alumno.email;    
    alumno.estatus = req.body.estatus ?? alumno.estatus;

    // Actualizar alumno
    try {
        const alumnoActualizado = await alumno.save();
        res.json(alumnoActualizado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        res.status(404).json({ msg: "Alumno no encontrado" });
    }

    try {
        await alumno.deleteOne();
        res.json({ msg: "Alumno eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrarAlumno,
    obtenerAlumnos,
    obtenerAlumno,
    actualizarAlumno,
    eliminarAlumno
};