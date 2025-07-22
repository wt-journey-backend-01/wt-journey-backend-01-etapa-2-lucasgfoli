const casosRepository = require("../repositories/casosRepository")

function getAllCasos(req, res) {

    const casos = casosRepository.findAll()
    res.status(200).json(casos)
}

function getSpecificCase(req, res) {
    const { id } = req.params
    const caso = casosRepository.findById(id)

    if (!caso)
        return res.status(404).json({ message: "Caso não encontrado" })
    else
        res.status(200).json(caso)
}

function createCase(req, res) {
    const { id, titulo, descricao, status, agente_id } = req.body

    if (!id || !titulo || !descricao || !status || !agente_id)
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

    if (status !== "aberto" && status !== "solucionado")
        return res.status(400).json({ message: "O status do caso deve ser 'aberto' ou 'solucionado'!" })

    const newCase = { id, titulo, descricao, status, agente_id }
    casosRepository.create(newCase)

    res.status(201).json(newCase)
}

function updateCase(req, res) {
    const { id } = req.params
    const { titulo, descricao, status, agente_id } = req.body

    if ( !titulo || !descricao || !status || !agente_id )
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" })

    if (status !== "aberto" && status !== "solucionado")
        return res.status(400).json({ message: "O status deve ser 'aberto' ou 'solucionado'" });

    const updatedCase = casosRepository.update( id, titulo, descricao, status, agente_id )

    if(!updatedCase)
        return res.status(400).json({message: "Caso não encontrado!"})

    res.status(200).json({message: "Caso atualizado!", caso: updatedCase })
}

function patchCase(req, res){
    const { id } = req.params
    const updates = req.body
    const updatedCase = casosRepository.patchById(id, updates)

    if(!updatedCase)
        return res.status(404).json({message: "Caso não encontrado!"})

    res.status(200).json({message: "Caso atualizado parcialmente", updatedCase})
}

function deleteCase (req, res){
    const {id} = req.params
    const casoDeletado = casosRepository.findById(id)

    if(!casoDeletado)
        return res.status(404).json({message: "Caso não encontrado"})

    casosRepository.deleteById(id)
    res.status(200).json({message: "Caso deletado!", caso: casoDeletado})
}

module.exports = {
    getAllCasos,
    getSpecificCase,
    createCase,
    updateCase,
    deleteCase,
    patchCase
}