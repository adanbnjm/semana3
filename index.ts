import express from "express";
import estudiantesRouter from "./routes/estudiantes"; //de aqui se importan estudiantes "segun"

const app = express();
const PORT = 3000;

app.use(express.json());

// comprobar que el servidor está funcionando
app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// rutas de estudiantes
app.use("/api/estudiantes", estudiantesRouter);

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
aaa;
