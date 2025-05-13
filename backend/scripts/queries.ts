import { getXataClient } from '../src/xata';
import * as cardsJson from '../cardsV2.json';

const client = getXataClient();

async function conectarAoBD() {
    try {
    } catch (error) {
        console.error("Erro ao tentar enviar o jsonData: " + error)
    }
}
async function buscarDados(materiaParam: string) {
    try {
    const data = await client.db.cards.filter({materia: materiaParam}).getAll() // Busca de dados
    console.log(data)
    } catch(e) {
        console.error("Erro ao buscar dados no banco de dados: " + e)
    }
}
async function inserirDadosJson() {
    try {
    const jsonData = cardsJson.cards
    jsonData.forEach(async card => {
        const resposta = await client.db.cards.create(card); // Envio json
    })
    } catch(e) {
        console.error("Erro ao inserir dados no banco de dados: " + e)
    }
}

async function deletarDadosJson(materiaParam: string) {
    try {
    const item = await client.db.cards.filter({materia: materiaParam}).getFirst()
    if (item != null)
        await client.db.cards.delete({xata_id: item.xata_id})
    } catch(e) {
        console.error("Erro ao deletar dados no banco de dados: " + e)
    }
}
// inserirDadosJson()
// buscarDados('materia_teste')
// deletarDadosJson('materia_teste')