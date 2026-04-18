import configuracionMensualidad from "../models/configuracionMensualidad.js";

const obtenerConfiguracion = async () => {
    return await configuracionMensualidad.find();
};

const actualizarMonto = async (tipo, monto) => {
    const config = await configuracionMensualidad.findOne({ tipo });
    if (!config) throw new Error(`No existe configuración para ${tipo}`);

    config.monto = monto;
    return await config.save();
};

export {
    obtenerConfiguracion,
    actualizarMonto
};