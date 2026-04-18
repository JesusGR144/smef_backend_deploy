import express from 'express';

const router = express.Router();
import { registrarAbonoMensualidad, liquidar, obtenerTodas } from '../controllers/mensualidadController.js';
import checkAuth from '../middleware/authMiddleware.js';

router.post('/abono/:id', checkAuth, registrarAbonoMensualidad);
router.post('/liquidar/:id', checkAuth, liquidar);
router.get('/', checkAuth, obtenerTodas);

export default router;