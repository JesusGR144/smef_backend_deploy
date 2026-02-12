import express from "express";
const router = express.Router();
import {registrar, perfil} from "../controllers/instructorController.js";

router.post("/", registrar);
router.get("/perfil", perfil);

export default router;