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
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'obtiene la lista de estudiantes o filtra por curso'

  const bootcamp = String(req.query.bootcamp || "");

  let resultado = estudiantes;

  if (bootcamp) {
    resultado = estudiantes.filter(
      (estudiante) =>
        estudiante.curso.toLowerCase().trim() === bootcamp.toLowerCase().trim(),
    );
  }

  const respuesta = resultado.map((estudiante) => ({
    id: estudiante.id,
    name: estudiante.nombre,
    email: estudiante.correo,
    bootcamp: estudiante.curso,
  }));

  res.json(respuesta);
});

// obtener un estudiante por id
router.get("/:id", (req, res) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'obtiene un estudiante por su id'
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
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'crea un nuevo estudiante'

  const { name, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "el correo es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre: name,
    correo: email,
    curso: bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});
// actualizar un estudiante
router.put("/:id", (req, res) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'actualiza un estudiante existente'

  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "estudiante no encontrado",
    });
  }

  const { name, email, bootcamp } = req.body;

  if (name !== undefined) {
    estudiante.nombre = name;
  }

  if (email !== undefined) {
    estudiante.correo = email;
  }

  if (bootcamp !== undefined) {
    estudiante.curso = bootcamp;
  }

  res.json(estudiante);
});
// eliminar un estudiante
router.delete("/:id", (req, res) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'elimina un estudiante por su id'
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
