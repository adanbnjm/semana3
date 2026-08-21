import { Router } from "express";

const router = Router();

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
    curso: "Full Stack",
  },
  {
    id: 2,
    nombre: "Ana",
    correo: "ana@gmail.com",
    curso: "Diseño de interiores",
  },
  {
    id: 3,
    nombre: "Pedro",
    correo: "pedro@gmail.com",
    curso: "Mineria de BTC",
  },
];

// obtener todos o filtrar por curso
router.get("/", (req, res) => {
  const curso = req.query.curso;

  if (curso) {
    const estudiantesFiltrados = estudiantes.filter(
      (estudiante) => estudiante.curso === curso,
    );

    return res.json(estudiantesFiltrados);
  }

  res.json(estudiantes);
});

// obtener un estudiante por id
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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

// eliminar un estudiante
router.delete("/:id", (req, res) => {
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

export default router;
