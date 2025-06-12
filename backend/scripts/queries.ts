import { getXataClient } from '../src/xata';

const client = getXataClient();

async function conectarAoBD() {
    const data = await client.db.cards.filter({pergunta: "a", resposta: "a", dificuldade: "a", acerto: false, imagem:"a"}).getMany();
}
conectarAoBD();