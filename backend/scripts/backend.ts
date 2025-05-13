import express from 'express';
import dotenv from 'dotenv';
import { getXataClient } from '../src/xata';
import { SelectedPick, SelectableColumn, EditableData } from '@xata.io/client';
import { UsersRecord, CardsRecord } from '../src/xata';

dotenv.config()
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Datbase
const xata = getXataClient();
const userFields: SelectableColumn<UsersRecord>[] = ['xata_id', 'nome', 'email', 'senha'];
const cardFields: SelectableColumn<CardsRecord>[] = ['xata_id', 'pergunta', 'resposta', 'materia', 'submateria', 'dificuldade', 'acertos'];
type aluno = EditableData<SelectedPick<UsersRecord, typeof userFields>>;
type card = EditableData<SelectedPick<CardsRecord, typeof cardFields>>;

// Informações das portas
app.listen(PORT, () => {
    try {
        console.log(`Aplicação escutando a porta ${PORT}.`);
        // Comando para conectar ao banco de dados online (tabela de usuários)
    } catch {
        console.error(`Houve um erro ao tentar escutar a porta ${PORT}`);
    }
})