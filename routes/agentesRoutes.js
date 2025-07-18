const express = require('express')
const router = express.Router()
const agentesController = require('../controllers/agentesController.js')

router.get('/agentes', agentesController.listarAgentes)
// router.get('/agentes/:id', agentesController.listarAgentes)


// GET /casos → Lista todos os casos registrados.
// GET /casos/:id → Retorna os detalhes de um caso específico.
// POST /casos → Cria um novo caso com os seguintes campos:
// PUT /casos/:id → Atualiza os dados de um caso por completo.
// PATCH /casos/:id → Atualiza os dados de um caso parcialmente.
// DELETE /casos/:id → Remove um caso do sistema.