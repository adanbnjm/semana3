import express from "express";
import estudiantesRouter from "./routes/estudiantes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.get("/api/status", (req, res) => {
  // #swagger.tags = ['SERVIDOR']
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});
app.use("/api/students", estudiantesRouter);
app.use("/api/estudiantes", estudiantesRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
