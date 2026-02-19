const recordatorioCumple = (fecha) => {

    if (!fecha) return null;

    const hoy = new Date();
    const fechaCumple = new Date(fecha);

    if (
        hoy.getUTCDate() !== fechaCumple.getUTCDate() ||
        hoy.getUTCMonth() !== fechaCumple.getUTCMonth()
    ) return null;

    return hoy.getUTCFullYear() - fechaCumple.getUTCFullYear();
};


export default recordatorioCumple;