import { transformFromAstAsync } from '@babel/core';
import * as fileSystem from 'expo-file-system'
import cardsJson from '../../localFiles/cardsJson.json'
const filePath = fileSystem.documentDirectory + 'cards.json';

// Códigos referentes a criação e adição de elementos ao Json
// Este código é responsável por criar um cardsJson base limpo, caso haja a necessidade
export async function criarJson() {
    const info = await fileSystem.getInfoAsync(filePath) 
    if (!info.exists) {
        console.log('Arquivo não existe. Criando JSON inicial...')
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(cardsJson));
    }
    else {
        console.log('Arquivo já existe.')
    }
}

// Este código é responsável por adicionar novos elementos matérias no cardsJson
async function adicionarMateria(materia: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        data[materia] = {};
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify('{}', null, 2));    
    } catch (err) {
        console.error(err)
    }
}

// Este código é responsável por adicionar novos elementos submatérias no cardsJson
// Ele é feito de tal maneira que só possível adicionar submatérias a uma matéria, e não a outra submatéria
// function adicionarSubmateria(materia: string, submateria: string) {
//     try {
//         const data = JSON.parse(fs.readFileSync(filePath))
//         data[materia] = {[submateria]: {}}
//         fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
//     } catch (err) {
//         console.error(err)
//     }
// }

// Este código é responsável por adicionar novos elementos flashcards no cardsJson
async function adicionarFlashcard(materia: string, pergunta: string, resposta: string, dificuldade: string, imagem: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
        // if (submateria == '') {
        let tamanho = (Object.keys(data[materia])).length
        data[materia].push({id: tamanho + 1, pergunta: pergunta, resposta: resposta, dificuldade: dificuldade, imagem: imagem})
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify('{}', null, 2));
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

async function buscarFlashcard(materia: string, pergunta: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
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

async function deletarFlashcard(materia: string, pergunta: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
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
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify('{}', null, 2));
        console.log('deleção bem-sucedida')
    } catch (err) {
        console.error(err)
    }
}

export async function buscarMaterias() {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
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