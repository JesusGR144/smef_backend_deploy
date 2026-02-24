import express from 'express';

const router = express.Router();
import { registrarAbono, liquidarMensualidad, obtenerMensualidades } from '../controllers/mensualidadController.js';
import checkAuth from '../middleware/authMiddleware.js';

router.post('/abono/:id', checkAuth, registrarAbono);
router.post('/liquidar/:id', checkAuth, liquidarMensualidad);
router.get('/', checkAuth, obtenerMensualidades);

export default router;