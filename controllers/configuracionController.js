import {
    obtenerConfiguracion,
    actualizarMonto
} from "../services/configuracionService.js";

const obtenerConfig = async (req, res) => {
    try {
        const config = await obtenerConfiguracion();
        res.json(config);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const actualizarConfiguracion = async (req, res) => {
    try {
        const config = await actualizarMonto(req.params.tipo, req.body.monto);
        res.json(config);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export {
    obtenerConfig,
    actualizarConfiguracion
};