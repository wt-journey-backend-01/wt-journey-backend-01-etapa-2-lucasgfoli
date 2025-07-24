/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos policiais
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna todos os casos
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [aberto, solucionado]
 *         description: Filtrar casos pelo status
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar casos pelo ID do agente
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Ordenar por um campo (ex: titulo, status)
 *     responses:
 *       200:
 *         description: Lista de casos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 */

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Dados do caso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso não encontrado
 *
 *   put:
 *     summary: Atualiza um caso pelo ID (substituição total)
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Caso não encontrado
 *
 *   patch:
 *     summary: Atualiza parcialmente um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [aberto, solucionado]
 *               agente_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Caso atualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Caso não encontrado
 *
 *   delete:
 *     summary: Remove um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do caso
 *     responses:
 *       204:
 *         description: Caso removido com sucesso
 *       404:
 *         description: Caso não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       required:
 *         - id
 *         - titulo
 *         - descricao
 *         - status
 *         - agente_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID do caso
 *         titulo:
 *           type: string
 *           description: Título do caso
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do caso
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *           description: Status do caso
 *         agente_id:
 *           type: string
 *           format: uuid
 *           description: ID do agente responsável pelo caso
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         titulo: "Roubo no banco"
 *         descricao: "Roubo com reféns ocorrido no centro da cidade."
 *         status: "aberto"
 *         agente_id: "123e4567-e89b-12d3-a456-426614174000"
 * 
 *     CasoInput:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - status
 *         - agente_id
 *       properties:
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *         agente_id:
 *           type: string
 *           format: uuid
 *       example:
 *         titulo: "Roubo no banco"
 *         descricao: "Roubo com reféns ocorrido no centro da cidade."
 *         status: "aberto"
 *         agente_id: "123e4567-e89b-12d3-a456-426614174000"
 * parameters:
  - name: status
    in: query
    schema:
      type: string
      enum: [aberto, solucionado]
    description: Filtra os casos pelo status
  - name: agente_id
    in: query
    schema:
      type: string
    description: Filtra os casos por agente responsável
  - name: search
    in: query
    schema:
      type: string
    description: Palavras-chave para busca no título ou descrição
  - name: orderBy
    in: query
    schema:
      type: string
      enum: [titulo, status, agente_id]
    description: Campo usado para ordenação dos resultados
  - name: order
    in: query
    schema:
      type: string
      enum: [asc, desc]
    description: Define a ordem da ordenação (ascendente ou descendente)
 */

const express = require('express')
const router = express.Router()
const casosController = require('../controllers/casosController.js')

router.get('/', casosController.getAllCasos)
router.get('/:id', casosController.getSpecificCase)
router.post('/', casosController.createCase)
router.put('/:id', casosController.updateCase)
router.patch('/:id', casosController.patchCase)
router.delete('/:id', casosController.deleteCase)

module.exports = router