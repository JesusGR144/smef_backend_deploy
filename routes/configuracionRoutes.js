import express from "express";
const router = express.Router();
import checkAuth from "../middleware/authMiddleware.js";
import {
    obtenerConfig,
    actualizarConfiguracion
} from "../controllers/configuracionController.js";

router
    .route("/")
    .get(checkAuth, obtenerConfig);

router
    .route("/:tipo")
    .put(checkAuth, actualizarConfiguracion);

export default router;