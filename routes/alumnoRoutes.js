import express from "express";
const router = express.Router();
import {registrarAlumno, 
        obtenerAlumnos,
        obtenerAlumno,
        actualizarAlumno,
        eliminarAlumno,
} from "../controllers/alumnoController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
    .route("/")
    .post(checkAuth, registrarAlumno)
    .get(checkAuth, obtenerAlumnos);

router
    .route("/:id")
    .get(checkAuth, obtenerAlumno)
    .put(checkAuth, actualizarAlumno)
    .delete(checkAuth, eliminarAlumno);
    

export default router; 