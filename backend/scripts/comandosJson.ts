import { transformFromAstAsync } from '@babel/core';
import fs from 'fs';
import path from 'path';
const filePath = path.join('..', 'localFiles', 'cardsJson.json');

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
// function adicionarSubmateria(materia: string, submateria: string) {
//     try {
//         const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
//         data[materia] = {[submateria]: {}}
//         fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
//     } catch (err) {
//         console.error(err)
//     }
// }

// Este código é responsável por adicionar novos elementos flashcards no cardsJson
function adicionarFlashcard(materia: string, pergunta: string, resposta: string, dificuldade: string, imagem: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        // if (submateria == '') {
        let tamanho = (Object.keys(data[materia])).length
        data[materia].push({id: tamanho + 1, pergunta: pergunta, resposta: resposta, dificuldade: dificuldade, imagem: imagem})
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
type Card = {
    pergunta: string;
    resposta: string;
    dificuldade: string;
    imagem: string;
}

function buscarFlashcard(materia: string, pergunta: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const rawCards = data[materia]
        if (!rawCards) {
            return undefined
        }
        const cards = Object.values(rawCards) as Card[]
        for (const card of cards) {
            if (card.pergunta === pergunta) {  
                return card
            }
        }
        return undefined
    } catch (err) {
        console.error(err)
        return undefined
    }
}

function deletarFlashcard(materia: string, pergunta: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const rawCards = data[materia]
        console.log(rawCards)
        if (!rawCards) {
            return undefined
        }
        const cards = Object.values(rawCards) as Card[]
        
        for (const card of cards) {
            if (card.pergunta === pergunta) {
                console.log(card)
                cards.splice(cards.indexOf(card), 1)
            }
        }

        data[materia] = cards
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        console.log('deleção bem-sucedida')
    } catch (err) {
        console.error(err)
    }
}

export function buscarMaterias() {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        if (!data) {
            return undefined
        }
        const materias = Object.keys(data)
        return materias
    } catch (err) {
        console.error(err)
        return undefined
    }
}
//function buscarTodosFlashcards() {}


// adicionarFlashcard("matemática", "pergunta", "resposta", "fácil", "")

// const card = buscarFlashcard('matemática')
// console.log(card)
console.log(buscarMaterias())