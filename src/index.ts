import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  correo: string;
  curso: string;
}

const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Carlos",
    correo: "carlos@gmail.com",
    curso: "full stack o un intento de ello",
  },
  {
    id: 2,
    nombre: "Ana",
    correo: "ana@gmail.com",
    curso: "diseño de interiores",
  },
  {
    id: 3,
    nombre: "Pedro",
    correo: "pedro@gmail.com",
    curso: "mineria pero de btc",
  },
];

// comprobar que el servidor está funcionando
app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// obtener todos los estudiantes
app.get("/api/estudiantes", (req, res) => {
  res.json(estudiantes);
});
// obtener un estudiante por ID
app.get("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "estudiante no encontrado",
    });
  }

  res.json(estudiante);
});

// crear un estudiante
app.post("/api/estudiantes", (req, res) => {
  const { nombre, correo, curso } = req.body;

  if (!correo) {
    return res.status(400).json({
      error: "el correo es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    correo,
    curso,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

// actualizar un estudiante
app.put("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const { nombre, correo, curso } = req.body;

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "estudiante no encontrado",
    });
  }

  estudiante.nombre = nombre;
  estudiante.correo = correo;
  estudiante.curso = curso;

  res.json(estudiante);
});

// Eliminar un estudiante
app.delete("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "estudiante no encontrado",
    });
  }

  estudiantes.splice(indice, 1);

  res.json({
    mensaje: "estudiante eliminado correctamente",
  });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
