import express from "express";
const router = express.Router();
import {registrarAlumno, 
        obtenerTodosAlumnos,
        obtenerAlumno,
        actualizarUnAlumno,
        eliminarUnAlumno,
} from "../controllers/alumnoController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
    .route("/")
    .post(checkAuth, registrarAlumno)
    .get(checkAuth, obtenerTodosAlumnos);

router
    .route("/:id")
    .get(checkAuth, obtenerAlumno)
    .put(checkAuth, actualizarUnAlumno)
    .delete(checkAuth, eliminarUnAlumno);
    

export default router; 