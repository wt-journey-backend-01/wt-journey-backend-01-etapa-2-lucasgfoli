const casosRepository = require("../repositories/casosRepository")
const agentesRepository = require("../repositories/agentesRepository")
const { v4: uuidv4 } = require('uuid')
const handlerError = require('../utils/errorHandler')

function getAllCasos(req, res) {
    try {
        const { status, agente_id, orderBy } = req.query
        let casos = casosRepository.findAll()

        if (status)
            casos = casos.filter(caso => caso.status === status)

        if (agente_id)
            casos = casos.filter(caso => caso.agente_id === agente_id)

        if (orderBy) {
            casos.sort((a, b) => {
                if (a[orderBy] < b[orderBy]) return -1
                if (a[orderBy] > b[orderBy]) return 1
                return 0
            })
        }

        res.status(200).json(casos)
    } catch (error) {
        handlerError(res, error)
    }
}

function getSpecificCase(req, res) {
    try {
        const { id } = req.params
        const caso = casosRepository.findById(id)

        if (!caso)
            return res.status(404).json({ message: "Caso não encontrado" })
        else
            res.status(200).json(caso)
    } catch (error) {
        handlerError(res, error)
    }
}

function createCase(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body
        const id = uuidv4()
        const agenteExistente = agentesRepository.findById(agente_id)

        if (!agenteExistente)
            return res.status(400).json({ message: "Agente não encontrado pelo agente_id fornecido" })

        if (!titulo || !descricao || !status || !agente_id)
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        if (status !== "aberto" && status !== "solucionado")
            return res.status(400).json({ message: "O status do caso deve ser 'aberto' ou 'solucionado'!" })

        const newCase = { id, titulo, descricao, status, agente_id }
        casosRepository.create(newCase)

        res.status(201).json(newCase)
    } catch (error) {
        handlerError(res, error)
    }
}

function updateCase(req, res) {
    try {
        const { id } = req.params
        const { titulo, descricao, status, agente_id } = req.body
        const agenteExistente = agentesRepository.findById(agente_id)

        if (!agenteExistente)
            return res.status(400).json({ message: "Agente não encontrado pelo agente_id fornecido" })

        if (!titulo || !descricao || !status || !agente_id)
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        if (status !== "aberto" && status !== "solucionado")
            return res.status(400).json({ message: "O status deve ser 'aberto' ou 'solucionado'" })

        const updatedCase = casosRepository.update(id, titulo, descricao, status, agente_id)

        if (!updatedCase)
            return res.status(400).json({ message: "Caso não encontrado!" })

        res.status(200).json({ message: "Caso atualizado!", caso: updatedCase })
    } catch (error) {
        handlerError(res, error)
    }
}

function patchCase(req, res) {
    try {
        const { id } = req.params
        const updates = req.body
        const camposValidos = ['titulo', 'descricao', 'status', 'agente_id']

        const camposAtualizaveis = Object.keys(updates).filter(campo => {
            return camposValidos.includes(campo)
        })

        if (camposAtualizaveis.length === 0)
            return res.status(400).json({ message: "Deve conter pelo menos um campo!" })

        if (updates.status && updates.status !== "aberto" && updates.status !== "solucionado")
            return res.status(400).json({ message: "O status deve ser 'aberto' ou 'solucionado'" })

        if (updates.agente_id) {
            const agenteExistente = agentesRepository.findById(updates.agente_id)
            if (!agenteExistente)
                return res.status(400).json({ message: "Agente não encontrado pelo agente_id fornecido" })
        }

        const updatedCase = casosRepository.patchById(id, updates)

        if (!updatedCase)
            return res.status(404).json({ message: "Caso não encontrado!" })

        res.status(200).json({ message: "Caso atualizado parcialmente", updatedCase })
    } catch (error) {
        handlerError(res, error)
    }
}

function deleteCase(req, res) {
    try {
        const { id } = req.params
        const casoDeletado = casosRepository.findById(id)

        if (!casoDeletado)
            return res.status(404).json({ message: "Caso não encontrado" })

        casosRepository.deleteById(id)
        res.status(204).send()
    } catch (error) {
        handlerError(res, error)
    }
}

module.exports = {
    getAllCasos,
    getSpecificCase,
    createCase,
    updateCase,
    deleteCase,
    patchCase
}
