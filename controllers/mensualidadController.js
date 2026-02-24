import Mensualidad from '../models/Mensualidad.js';

const registrarAbono = async (req, res) => {
    const { id } = req.params;
    const { abono } = req.body;

    const mensualidad = await Mensualidad.findById(id);

    if (!mensualidad) {
        return res.status(404).json({ msg: "Mensualidad no encontrada" });
    }

    mensualidad.abono += abono;

    // Si el abono cubre el monto total más recargo, marcar como pagado
    if (mensualidad.abono >= mensualidad.montoTotal + mensualidad.recargo) {
    mensualidad.pagado = true;
}

    try {
        const mensualidadActualizada = await mensualidad.save();
        res.json(mensualidadActualizada);
    } catch (error) {
        console.log(error);
    }
};

const liquidarMensualidad = async (req, res) => {
    const { id } = req.params;

    const mensualidad = await Mensualidad.findById(id);

    if (!mensualidad) {
        return res.status(404).json({ msg: "Mensualidad no encontrada" });
    }

    mensualidad.abono = mensualidad.montoTotal + mensualidad.recargo;
    mensualidad.pagado = true;
    
    try {
        const mensualidadActualizada = await mensualidad.save();
        res.json(mensualidadActualizada);
    } catch (error) {
        console.log(error);
    }
};

const obtenerMensualidades = async (req, res) => {
    const mensualidades = await Mensualidad.find().populate('alumno', 'nombre');

    res.json(mensualidades);

};


export {
    registrarAbono,
    liquidarMensualidad,
    obtenerMensualidades
}