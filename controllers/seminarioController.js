import {crearSeminario,
    listarSeminarios,
    obtenerPorId,
    actualizar,
    eliminar} from "../services/seminarioService.js";

const registrarSeminario = async (req, res) => {
    try {
        const seminarioGuardado = await crearSeminario(req.body);
        res.status(201).json(seminarioGuardado);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const obtenerSeminarios = async (req, res) => {
    try {
        const seminarios = await listarSeminarios();
        res.json(seminarios);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener seminarios" });
    }
};

const obtenerSeminario = async (req, res) => {
    try {
        const seminario = await obtenerPorId(req.params.id);
        res.json(seminario);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const actualizarSeminario = async (req, res) => {
    try {
        const actualizado = await actualizar(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const eliminarSeminario = async (req, res) => {
    try {
        const resultado = await eliminar(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export {
    registrarSeminario,
    obtenerSeminarios,
    obtenerSeminario,
    actualizarSeminario,
    eliminarSeminario
};