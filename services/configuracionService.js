import ConfiguracionMensualidad from "../models/ConfiguracionMensualidad.js";

const obtenerConfiguracion = async () => {
    return await ConfiguracionMensualidad.find();
};

const actualizarMonto = async (tipo, monto) => {
    const config = await ConfiguracionMensualidad.findOne({ tipo });
    if (!config) throw new Error(`No existe configuración para ${tipo}`);

    config.monto = monto;
    return await config.save();
};

export {
    obtenerConfiguracion,
    actualizarMonto
};