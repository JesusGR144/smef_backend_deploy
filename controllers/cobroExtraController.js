import {
    crearCobroExtra,
    obtenerCobrosPorAlumno,
    abonarCobroExtra,
    liquidarCobroExtra,
    eliminarCobroExtra
} from "../services/cobroExtraService.js";

const registrarCobroExtra = async (req, res) => {
    try {
        const cobro = await crearCobroExtra(req.body);
        res.status(201).json(cobro);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const obtenerCobros = async (req, res) => {
    try {
        const cobros = await obtenerCobrosPorAlumno(req.params.alumnoId);
        res.json(cobros);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const registrarAbono = async (req, res) => {
    try {
        const cobro = await abonarCobroExtra(req.params.id, req.body.abono);
        res.json(cobro);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const liquidarCobro = async (req, res) => {
    try {
        const cobro = await liquidarCobroExtra(req.params.id);
        res.json(cobro);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const eliminarCobro = async (req, res) => {
    try {
        const resultado = await eliminarCobroExtra(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export {
    registrarCobroExtra,
    obtenerCobros,
    registrarAbono,
    liquidarCobro,
    eliminarCobro
};