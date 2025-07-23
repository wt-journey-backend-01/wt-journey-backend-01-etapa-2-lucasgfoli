const agentesRepository = require('../repositories/agentesRepository')
const { v4: uuidv4 } = require('uuid')
const handlerError = require('../utils/errorHandler')

function getAllAgentes(req, res) {
    try {
        const { cargo, dataDeIncorporacao, orderBy } = req.query
        let agentes = agentesRepository.findAll()

        if (cargo)
            agentes = agentes.filter(agente => agente.cargo === cargo)

        if (dataDeIncorporacao)
            agentes = agentes.filter(agente => agente.dataDeIncorporacao === dataDeIncorporacao)

        if (orderBy) {
            agentes.sort((a, b) => {
                if (a[orderBy] < b[orderBy]) return -1
                if (a[orderBy] > b[orderBy]) return 1
                return 0
            })
        }
        res.status(200).json(agentes)
    } catch (error) {
        handlerError(res, error)
    }
}

function getAgenteById(req, res) {
    try {
        const { id } = req.params
        const agente = agentesRepository.findById(id)

        if (!agente)
            return res.status(404).json({ message: "Agente não encontrado!" })
        else
            res.status(200).json(agente)
    } catch (error) {
        handlerError(res, error)
    }
}

function createAgente(req, res) {
    try {
        const { nome, dataDeIncorporacao, cargo } = req.body
        const id = uuidv4()

        if (!validarData(dataDeIncorporacao))
            return res.status(400).json({ message: "Data de incorporação inválida! Use o formato YYYY-MM-DD e não informe datas futuras." })

        if (!nome || !dataDeIncorporacao || !cargo)
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        const newAgente = { id, nome, dataDeIncorporacao, cargo }

        agentesRepository.create(newAgente)
        res.status(201).json(newAgente)
    } catch (error) {
        handlerError(res, error)
    }
}

function updateAgente(req, res) {
    try {
        const { id } = req.params
        const { nome, dataDeIncorporacao, cargo } = req.body

        if (!validarData(dataDeIncorporacao))
            return res.status(400).json({ message: "Data de incorporação inválida! Use o formato YYYY-MM-DD e não informe datas futuras." })

        if (!nome || !dataDeIncorporacao || !cargo)
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        const agenteAtualizado = agentesRepository.update({ id, nome, dataDeIncorporacao, cargo })

        if (!agenteAtualizado)
            return res.status(404).json({ message: "Agente não encontrado!" })

        res.status(200).json({ message: "Dados do agente atualizado com sucesso: ", agenteAtualizado })
    } catch (error) {
        handlerError(res, error)
    }
}

function patchAgente(req, res) {
    try {
        const { id } = req.params
        const updates = req.body
        const camposValidos = ['nome', 'dataDeIncorporacao', 'cargo']

        const camposAtulizaveis = Object.keys(updates).filter(campo => {
            return camposValidos.includes(campo)
        })

        if (camposAtulizaveis.length === 0)
            return res.status(400).json({ message: "Deve conter pelo menos um campo válido!" })

        const patchedAgente = agentesRepository.patchById(id, updates)

        if (!patchedAgente)
            return res.status(404).json({ message: "Agente não encontrado!" })

        res.status(200).json({ message: "Dado do agente atualizado com sucesso: ", patchedAgente })
    } catch (error) {
        handlerError(res, error)
    }
}

function deleteAgente(req, res) {
    try {
        const { id } = req.params
        const agente = agentesRepository.findById(id)

        if (!agente)
            return res.status(404).json({ message: "Agente não encontrado" })

        const agenteDeletado = agentesRepository.deleteById(id)
        res.status(204).send()
    } catch (error) {
        handlerError(res, error)
    }
}

function validarData(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/

    if (!regex.test(dateString)) return false

    const date = new Date(dateString)
    const today = new Date()

    if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateString)
        return false

    if (date > today) return false

    return true
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
}
