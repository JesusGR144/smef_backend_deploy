import express from "express";
const router = express.Router();
import {
    registrarSeminario,
    obtenerSeminarios,
    obtenerSeminario,
    actualizarSeminario,
    eliminarSeminario
} from "../controllers/seminarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
    .route("/")
    .post(checkAuth, registrarSeminario)
    .get(checkAuth, obtenerSeminarios);

router
    .route("/:id")
    .get(checkAuth, obtenerSeminario)
    .put(checkAuth, actualizarSeminario)
    .delete(checkAuth, eliminarSeminario);

export default router;