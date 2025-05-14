import fs from 'fs';
import path from 'path';

const filePath = path.join('.', 'localFiles', 'cardsJson.json');

// Códigos referentes a criação e adição de elementos ao Json

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
function adicionarFlashcard(materia: string, pergunta: string, resposta: string, dificuldade: string, imagem: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        // if (submateria == '') {
        let tamanho = Object.keys(data[materia]).length
        data[materia][`card${tamanho}`] = {pergunta: pergunta, resposta: resposta, dificuldade: dificuldade, imagem: imagem}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        // }
        // else {   
        //     let tamanho = Object.keys(data[materia][submateria]).length
        //     data[materia][submateria][`card${tamanho+1}`] = {pergunta: pergunta, resposta: resposta, dificuldade: dificuldade}
        //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        // }
    } catch (err) {
        console.error(err)
    }
}

// Códigos referentes a busca de elementos ao Json
function buscarFlashcard(materia: string, submateria:string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const rawCards = data[materia][submateria]
        const cards = Object.values(rawCards)
        cards.forEach((card: { pergunta: string }) => {
            console.log(card.pergunta);
        });
    } catch (err) {
        console.error(err)
    }
}

buscarFlashcard('matemática', 'álgebra')