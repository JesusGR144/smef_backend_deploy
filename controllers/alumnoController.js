import { generarMensualidad, aplicarRecargos } from '../services/mensualidadService.js';
import {
    crearAlumno,
    obtenerAlumnos,
    obtenerAlumnoPorId,
    actualizarAlumno,
    eliminarAlumno
} from '../services/alumnoService.js';

const registrarAlumno = async (req, res) => {
    try {
        const alumno = await crearAlumno(req.body, req.instructor._id);
        res.status(201).json(alumno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const obtenerTodosAlumnos = async (req, res) => {
    try {
        await generarMensualidad();
        await aplicarRecargos();
        const alumnos = await obtenerAlumnos();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const obtenerAlumno = async (req, res) => {
    try {
        const alumno = await obtenerAlumnoPorId(req.params.id);
        res.json(alumno);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const actualizarUnAlumno = async (req, res) => {
    try {
        const alumno = await actualizarAlumno(req.params.id, req.body);
        res.json(alumno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const eliminarUnAlumno = async (req, res) => {
    try {
        const resultado = await eliminarAlumno(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export {
    registrarAlumno,
    obtenerTodosAlumnos,
    obtenerAlumno,
    actualizarUnAlumno,
    eliminarUnAlumno
};