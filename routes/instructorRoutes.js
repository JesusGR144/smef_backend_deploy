import express from "express";
const router = express.Router();
import {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword} from "../controllers/instructorController.js";
import checkAuth from "../middleware/authMiddleware.js";

// Rutas publicas
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// Rutas privadas
router.get("/perfil", checkAuth, perfil);
router.get("/alumnos", checkAuth);

export default router;