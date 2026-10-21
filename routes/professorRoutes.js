
const express = require("express");
const router = express.Router();

const professorController = require("../controllers/professorController");

// Listar todos os professores
router.get("/", professorController.listarProfessores);

// Listar professores por departamento
router.get(
    "/departamento/:departamento",
    professorController.listarPorDepartamento
);

// Buscar professor por ID
router.get("/:id", professorController.buscarProfessor);

// Listar turmas de um professor
router.get("/:id/turmas", professorController.listarTurmas);

// Atualizar professor
router.put("/:id", professorController.atualizarProfessor);

// Adicionar turma
router.post("/:id/turmas", professorController.adicionarTurma);

// Excluir professor
router.delete("/:id", professorController.excluirProfessor);

module.exports = router;
