import fs from 'fs';
import path from 'path';

const filePath = path.join('.', 'localFiles', 'cardsJson.json');

// Este código é responsável por criar um cardsJson base limpo, caso haja a necessidade
function criarJson() {
    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, JSON.stringify('{}', null, 2));
        } catch (err) {
            console.error(err);
        }
    }
}

// Este código é responsável por adicionar novos elementos matérias no cardsJson
function adicionarMateria(materia: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        data[materia] = {}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
}

// Este código é responsável por adicionar novos elementos submatérias no cardsJson
// Ele é feito de tal maneira que só possível adicionar submatérias a uma matéria, e não a outra submatéria
function adicionarSubmateria(materia: string, submateria: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        data[materia] = {[submateria]: {}}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
}

// Este código é responsável por adicionar novos elementos flashcards no cardsJson
// Ainda falta modificá-lo para que seja possível inserir flashcards em matérias diretamente, sem a necessidade deles serem inseridos em submatérias
function adicionarFlashcard(materia: string, submateria:string, pergunta: string, resposta: string, dificuldade: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        let tamanho = Object.keys(data[materia][submateria]).length
        data[materia][submateria][`card${tamanho+1}`] = {pergunta: pergunta, resposta: resposta, dificuldade: dificuldade}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
}

// adicionarMateria('matemática')
// adicionarSubmateria('matemática', 'álgebra')
// adicionarFlashcard('matemática', 'álgebra', 'pergunta teste', 'resposta teste', 'médio')