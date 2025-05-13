import express from 'express';
import dotenv from 'dotenv';
import { getXataClient } from '../src/xata';
import { SelectedPick, SelectableColumn, EditableData } from '@xata.io/client';
import { UsersRecord } from '../src/xata';

dotenv.config()
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Datbase
const xata = getXataClient();
const fields: SelectableColumn<UsersRecord>[] = ['xata_id', 'nome', 'senha'];
type aluno = EditableData<SelectedPick<UsersRecord, typeof fields>>;

async function conectarAoBD() {

}

// Informações das portas
app.listen(PORT, () => {
    try {
        console.log(`Aplicação escutando a porta ${PORT}.`);
        // Comando para conectar ao banco de dados online (tabela de usuários)
    } catch {
        console.error(`Houve um erro ao tentar escutar a porta ${PORT}`);
    }
})