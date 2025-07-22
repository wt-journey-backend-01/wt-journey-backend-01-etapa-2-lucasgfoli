const agentesRepository = require('../repositories/agentesRepository')

function getAllAgentes(req, res) {
        const agentes = agentesRepository.findAll()
        res.status(200).json({ agentes })
}

function getAgenteById(req, res) {
        const { id } = req.params
        const agente = agentesRepository.findById(id)

        if (!agente)
                return res.status(404).json({ message: "Agente não encontrado!" })
        else
                res.status(200).json(agente)
}

function createAgente(req, res) {
        const { id, nome, dataDeIncorporacao, cargo } = req.body

        if (!id || !nome || !dataDeIncorporacao || !cargo)
                return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        const newAgente = { id, nome, dataDeIncorporacao, cargo }

        agentesRepository.create(newAgente)
        res.status(201).json(newAgente)
}

function updateAgente(req, res) {
        const { id } = req.params
        const { nome, dataDeIncorporacao, cargo } = req.body

        if (!id || !nome || !dataDeIncorporacao || !cargo)
                return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

        const agenteAtualizado = agentesRepository.update({ id, nome, dataDeIncorporacao, cargo })

        if (!agenteAtualizado)
                return res.status(404).json({ message: "Agente não encontrado!" })

        res.status(204).json({ message: "Dados do agente atualizado com sucesso: ", agenteAtualizado })
}

function patchAgente(req, res) {
        const { id } = req.params
        const updates = req.body

        const patchedAgente = agentesRepository.patchById(id, updates)

        if (!patchedAgente)
                return res.status(404).json({ message: "Agente não encontrado!" })

        res.status(204).json({ message: "Dado do agente atualizado com sucesso: ", patchedAgente })
}

function deleteAgente(req, res) {
        const { id } = req.params
        const agente = agentesRepository.findById(id)

        if (!agente)
                return res.status(404).json({ message: "Agente não encontrado" })

        const agenteDeletado = agentesRepository.deleteById(id)
        res.status(200).json({ message: "Agente deletado:", agenteDeletado })
}

module.exports = {
        getAllAgentes,
        getAgenteById,
        createAgente,
        updateAgente,
        patchAgente,
        deleteAgente
}