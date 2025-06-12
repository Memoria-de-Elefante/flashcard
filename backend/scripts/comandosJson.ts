import { transformFromAstAsync } from '@babel/core';
import fs from 'fs';
import path from 'path';
const filePath = path.join('..', 'localFiles', 'cardsJson.json');


function criarJson() {
    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, JSON.stringify('{}', null, 2));
        } catch (err) {
            console.error(err);
        }
    }
}


function adicionarMateria(materia: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        data[materia] = {}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error(err)
    }
}




function adicionarFlashcard(materia: string, pergunta: string, resposta: string, dificuldade: string, imagem: string) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
       
        let tamanho = (Object.keys(data[materia])).length
        data[materia].push({id: tamanho + 1, pergunta: pergunta, resposta: resposta, dificuldade: dificuldade, imagem: imagem})
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
       
    } catch (err) {
        console.error(err)
    }
}

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

console.log(buscarMaterias())