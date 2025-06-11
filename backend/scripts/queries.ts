import { getXataClient } from '../src/xata';

const client = getXataClient();

async function conectarAoBD() {
    const data = await client.db.users.filter({nome: 'a', email: 'a', senha: 'a'}).getMany();
    console.log(data)
}
conectarAoBD();