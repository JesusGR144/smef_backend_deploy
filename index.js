import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import instructorRoutes from "./routes/instructorRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use("/api/instructores", instructorRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});