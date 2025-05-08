import { getXataClient } from '../src/xata';

const client = getXataClient();

async function conectarAoBD() {
    const data = await client.db.alunos.filter({email: 'a', senha: 'a'}).getMany();
    console.log(data)
}
conectarAoBD();