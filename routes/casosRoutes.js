const express = require('express')
const router = express.Router()
const casosController = require('../controllers/casosController.js')

router.get('/casos', casosController.getAllCasos)