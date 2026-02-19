const recordatorioPago = (fecha) => {
    if (!fecha) return null;

    const hoy = new Date();
    const fechaPago = new Date(fecha);

    if(hoy.getUTCDate() !== fechaPago.getUTCDate()) return null;

    return true;
};

export default recordatorioPago;

    