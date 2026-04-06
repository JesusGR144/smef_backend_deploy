import {
    asignarSeminario,
    obtenerInscripcionesPorSeminario,
    abonarInscripcion,
    liquidar,
    eliminarInscripcion
} from "../services/inscripcionService.js";

const asignar = async (req, res) => {
    try {
        await asignarSeminario(req.params.seminarioId);
        res.json({ msg: "Alumnos asignados correctamente" });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const obtenerInscripciones = async (req, res) => {
    try {
        const inscripciones = await obtenerInscripcionesPorSeminario(req.params.seminarioId);
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const registrarAbono = async (req, res) => {
    try {
        const actualizada = await abonarInscripcion(req.params.id, req.body.abono);
        res.json(actualizada);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const liquidarInscripcion = async (req, res) => {
    try {
        const actualizada = await liquidar(req.params.id);
        res.json(actualizada);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const quitarInscripcion = async (req, res) => {
    try {
        const resultado = await eliminarInscripcion(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export {
    asignar,
    obtenerInscripciones,
    registrarAbono,
    liquidarInscripcion,
    quitarInscripcion
};