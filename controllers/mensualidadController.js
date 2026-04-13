import {
    registrarAbono,
    liquidarMensualidad,
    obtenerMensualidades
} from '../services/mensualidadService.js';

const registrarAbonoMensualidad = async (req, res) => {
    try {
        const mensualidad = await registrarAbono(req.params.id, req.body.abono);
        res.json(mensualidad);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const liquidar = async (req, res) => {
    try {
        const mensualidad = await liquidarMensualidad(req.params.id);
        res.json(mensualidad);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const obtenerTodas = async (req, res) => {
    try {
        const mensualidades = await obtenerMensualidades();
        res.json(mensualidades);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export {
    registrarAbonoMensualidad,
    liquidar,
    obtenerTodas
};