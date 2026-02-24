import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import mensualidadRoutes from "./routes/mensualidadRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/instructores", instructorRoutes);
app.use("/api/alumnos", alumnoRoutes);
app.use("/api/mensualidades", mensualidadRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});