const express = require('express')
const router = express.Router()
const agentesController = require('../controllers/agentesController.js')

router.get('/agentes', agentesController.listarAgentes)


// router.get('/agentes/:id', agentesController.listarAgentes)

