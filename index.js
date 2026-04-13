import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import mensualidadRoutes from "./routes/mensualidadRoutes.js";
import seminarioRoutes from "./routes/seminarioRoutes.js";
import inscripcionRoutes from "./routes/inscripcionRoutes.js";
import cobroExtraRoutes from "./routes/cobroExtraRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/instructores", instructorRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/mensualidades", mensualidadRoutes);
app.use("/api/seminarios", seminarioRoutes);
app.use("/api/inscripciones", inscripcionRoutes);
app.use("/api/cobros-extra", cobroExtraRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});