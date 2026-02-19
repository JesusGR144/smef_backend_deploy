import Alumno from '../models/alumno.js';

const registrarAlumno = async (req, res) => {
    const alumno = new Alumno(req.body);
    alumno.instructor = req.instructor._id;

    try {
        const alumnoAlmacenado = await alumno.save();
        res.json({ alumnoAlmacenado });
    } catch (error) {
        console.log(error.message);
    }
};

const obtenerAlumnos = async (req, res) => {

    const alumnos = await Alumno.find();

    // const alumnosConCumple = alumnos.map(alumno => {

    //     const edad = recordatorioCumple(alumno.fechaCumple);

    //     return {
    //         ...alumno.toObject(),  // convierte documento mongoose a objeto normal
    //         esCumple: edad !== null,
    //         edadCumple: edad
    //     };
    // });

    res.json(alumnos);
};


const obtenerAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        return res.status(404).json({ msg: "Alumno no encontrado" });
    }

    res.json(alumno);
};

const actualizarAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        res.status(404).json({ msg: "Alumno no encontrado" });
    }

    alumno.nombre = req.body.nombre || alumno.nombre;
    alumno.email = req.body.email || alumno.email;
    alumno.fechaRegistro = req.body.fechaRegistro || alumno.fechaRegistro;
    alumno.fechaCumple = req.body.fechaCumple || alumno.fechaCumple;
    alumno.estatus = req.body.estatus ?? alumno.estatus;

    // Actualizar alumno
    try {
        const alumnoActualizado = await alumno.save();
        res.json(alumnoActualizado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarAlumno = async (req, res) => {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
        res.status(404).json({ msg: "Alumno no encontrado" });
    }

    try {
        await alumno.deleteOne();
        res.json({ msg: "Alumno eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrarAlumno,
    obtenerAlumnos,
    obtenerAlumno,
    actualizarAlumno,
    eliminarAlumno
};