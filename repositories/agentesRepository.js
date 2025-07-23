const agentes = [
{
  "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
  "nome": "Rommel Carneiro",
  "dataDeIncorporacao": "1992/10/04",
  "cargo": "delegado"
},
]

function findAll(){
    return agentes
}

function findById(id) {
    return agentes.find(agente => agente.id === id) 
}

function create(novoAgente){
    agentes.push(novoAgente)
}

function update({id, nome, dataDeIncorporacao, cargo}){
    const agente = agentes.find(agente => agente.id === id)

    if(agente){
        agente.nome = nome;
        agente.dataDeIncorporacao = dataDeIncorporacao;
        agente.cargo = cargo;
        return agente
    } else
        return null
}

function patchById(id, updates){
    const agente = agentes.find(agente => agente.id === id)
    
    if(!agente)
        return null

    delete updates.id

    Object.keys(updates).forEach(prop => {
        if(updates[prop] !== undefined)
            agente[prop] = updates[prop]
    })

    return agente
}

function deleteById(id) {
    const index = agentes.findIndex(agente => agente.id === id)

    if(index !== -1){
        const removido = agentes.splice(index, 1)
        return removido[0]
    } else
        return null
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    patchById,
    deleteById
}