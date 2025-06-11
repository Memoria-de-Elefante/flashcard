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
export async function adicionarMateria(materia: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        data[materia] = [];
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));    
    } catch (err) {
        console.error(err)
    }
}

export async function deletarMateria(materia: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
        delete data[materia]
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err)
    }
}

export async function editarMateria(materia: string, novoNome: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        const materiaData = data[materia];
        delete data[materia];
        data[novoNome] = materiaData;
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));    
        console.log("JOINHA")
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
export async function adicionarFlashcard(id: number, materia: string, pergunta: string, resposta: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
        // if (submateria == '') {
        data[materia].push({id: id, pergunta: pergunta, resposta: resposta, dificuldade: "médio", imagem: "", acerto: false})
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
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
export type Card = {
    id: number;
    pergunta: string;
    resposta: string;
    dificuldade: string;
    imagem: string;
    acerto: boolean
}

export async function buscarFlashcard(materia: string, id: number) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        const rawCards = data[materia];
        if (!rawCards) {
            return undefined;
        }
        const cards = Object.values(rawCards) as Card[];
        for (const card of cards) {
            if (card.id === id) {  
                return card;
            }
        }
        return undefined;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export async function buscarTodosFlashcards(materia: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        const rawCards = data[materia];
        if (!rawCards) {
            return undefined;
        }
        const cards = Object.values(rawCards) as Card[];
        return cards;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export async function deletarFlashcard(materia: string, id: number) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        const rawCards = data[materia];
        const cards = Object.values(rawCards) as Card[];
        
        for (const card of cards) {
            if (card.id === id) {
                cards.splice(cards.indexOf(card), 1);
            }
        }

        data[materia] = cards;
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        console.log('deleção bem-sucedida');
    } catch (err) {
        console.error(err);
    }
}

export async function editarFlashcard(materia: string, id: number, novaPergunta: string, novaResposta: string, novaDificuldade: string, novaImagem: string) {
    try {
        const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
        const rawCards = data[materia];
        const cards = Object.values(rawCards) as Card[];

        for (const card of cards) {
            if (card.id === id) {
                card.pergunta = novaPergunta;
                card.resposta = novaResposta;
                card.dificuldade = novaDificuldade;
                card.imagem = novaImagem;
            }
        }

        data[materia] = cards;
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));    
        console.log("JOINHA")
        console.log(data[materia])
    } catch (err) {
        console.error(err);
    }
}

export async function foiAcerto(materia: string, id: number, acerto: boolean) {
    const data = JSON.parse(await fileSystem.readAsStringAsync(filePath));
    const rawCards = data[materia];
    const cards = Object.values(rawCards) as Card[];

    for (const card of cards) {
        if (card.id === id) { 
            card.acerto = acerto
        }
    }

    data[materia] = cards;
    await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));    
}

export async function print() {
    const data = JSON.parse(await fileSystem.readAsStringAsync(filePath))
    console.log(data['matéria 2'])
}
export async function delJson() {
    try {
    const info = await fileSystem.getInfoAsync(filePath);
    if (info.exists) {
      await fileSystem.deleteAsync(filePath);
      console.log('Arquivo deletado com sucesso.');
    } else {
      console.log('Arquivo não encontrado.');
    }
  } catch (err) {
    console.error('Erro ao deletar arquivo:', err);
  }
}
//function buscarTodosFlashcards() {}


// adicionarFlashcard("matemática", "pergunta", "resposta", "fácil", "")

// const card = buscarFlashcard('matemática')
// console.log(card)