import express from "express";
const router = express.Router();
import {
    registrarCobroExtra,
    obtenerCobros,
    registrarAbono,
    liquidarCobro,
    eliminarCobro
} from "../controllers/cobroExtraController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
    .route("/")
    .post(checkAuth, registrarCobroExtra);

router
    .route("/alumno/:alumnoId")
    .get(checkAuth, obtenerCobros);

router
    .route("/abono/:id")
    .post(checkAuth, registrarAbono);

router
    .route("/liquidar/:id")
    .post(checkAuth, liquidarCobro);

router
    .route("/:id")
    .delete(checkAuth, eliminarCobro);

export default router;