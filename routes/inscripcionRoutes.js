import express from "express";
const router = express.Router();
import {
    asignar,
    obtenerInscripciones,
    registrarAbono,
    liquidarInscripcion,
    quitarInscripcion
} from '../controllers/inscripcionController.js';
import checkAuth from '../middleware/authMiddleware.js';

router
    .route('/asignar/:seminarioId')
    .post(checkAuth, asignar);

router
    .route('/:seminarioId')
    .get(checkAuth, obtenerInscripciones);

router
    .route('/abono/:id')
    .post(checkAuth, registrarAbono);

router
    .route('/liquidar/:id')
    .post(checkAuth, liquidarInscripcion);

router
    .route('/:id')
    .delete(checkAuth, quitarInscripcion);

export default router;