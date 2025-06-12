import * as fileSystem from 'expo-file-system'
import cardsJson from '../../localFiles/cardsJson.json'
import { Platform } from 'react-native';
import { FeDiffuseLighting } from 'react-native-svg';
const filePath = fileSystem.documentDirectory + 'cards.json';
const eWeb = Platform.OS === 'web';
const chaveStorage = "cardsWeb";

// Códigos referentes a criação e adição de elementos ao Json
// Este código é responsável por criar um cardsJson base limpo, caso haja a necessidade
export async function criarJson() {
    if (eWeb) {
        const json = localStorage.getItem(chaveStorage);
        json ? console.log("Arquivo já existe.") : await localStorage.setItem(chaveStorage, JSON.stringify(cardsJson)) 
    }
    else {
        const info = await fileSystem.getInfoAsync(filePath) 
        if (!info.exists) {
            console.log('Arquivo não existe. Criando JSON inicial...');
            await fileSystem.writeAsStringAsync(filePath, JSON.stringify(cardsJson));
        }
        else {
            console.log('Arquivo já existe.');
        }
    }
}

export async function retornaJson() {
    let json = null;
    if (eWeb) {
        json = await localStorage.getItem(chaveStorage); 
    }
    else {
        json = await fileSystem.getInfoAsync(filePath);
    }
    return json
}

export async function salvarBackup(jsonBackup: any) {
    if (eWeb) {
        await localStorage.setItem(chaveStorage, JSON.stringify(jsonBackup)) 
    }
    else {
        await fileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonBackup))
    }
}

// Este código é responsável por adicionar novos elementos matérias no cardsJson
export async function adicionarMateria(materia: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
    
        if (json) {
            const data = JSON.parse(json);
            data[materia] = [];
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error(err)
    }
}

export async function deletarMateria(materia: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            delete data[materia]
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error(err)
    }
}

export async function editarMateria(materia: string, novoNome: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            const materiaData = data[materia];
            delete data[materia];
            data[novoNome] = materiaData;
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error(err)
    }
}

export async function buscarMaterias() {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            if (!data) return undefined
            const materias = Object.keys(data)
            return materias
        }
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
export async function adicionarFlashcard(id: string, materia: string, pergunta: string, resposta: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        console.log("teste1")
        if (json) {
            console.log(2)
            const data = JSON.parse(json);
            data[materia].push({id: id, pergunta: pergunta, resposta: resposta, dificuldade: "médio", imagem: "", backImage: "", acerto: false});
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error(err);
    }
}

// Códigos referentes a busca de elementos ao Json
export type Card = {
    id: string;
    pergunta: string;
    resposta: string;
    dificuldade: string;
    imagem: string;
	backImage: string;
    acerto: boolean
}

export async function buscarFlashcard(materia: string, id: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            const rawCards = data[materia];
            if (!rawCards) return undefined;
            const cards = Object.values(rawCards) as Card[];
            for (const card of cards) {
                if (card.id === id) {
                    return card;
                }
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
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            const rawCards = data[materia];
            if (!rawCards) return undefined;
            const cards = Object.values(rawCards) as Card[];
            return cards;
        }
        return undefined
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export async function deletarFlashcard(materia: string, id: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            const rawCards = data[materia];
            const cards = Object.values(rawCards) as Card[];

            for (const card of cards) {
                if (card.id === id) {
                    cards.splice(cards.indexOf(card), 1);
                }
            }
            data[materia] = cards;
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error(err);
    }
}

export async function editarFlashcard(materia: string, id: string, novaPergunta: string, novaResposta: string, novaDificuldade: string, novaImagem: string, novaBackImage: string) {
    try {
        let json = null;
        if (eWeb) json = await localStorage.getItem(chaveStorage);
        else json = await fileSystem.readAsStringAsync(filePath);
        if (json) {
            const data = JSON.parse(json);
            const rawCards = data[materia];
            const cards = Object.values(rawCards) as Card[];

            for (const card of cards) {
                if (card.id === id) {
                    card.pergunta = novaPergunta;
                    card.resposta = novaResposta;
                    card.dificuldade = novaDificuldade;
                    card.imagem = novaImagem;
					card.backImage = novaBackImage;
                }
            }

            data[materia] = cards;
            if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
            else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2)); 
        }
    } catch (err) {
        console.error(err);
    }
}

export async function foiAcerto(materia: string, id: string, acerto: boolean) {
    let json = null;
    if (eWeb) json = await localStorage.getItem(chaveStorage);
    else json = await fileSystem.readAsStringAsync(filePath);
    if (json) {
        const data = JSON.parse(json);
        const rawCards = data[materia];
        const cards = Object.values(rawCards) as Card[];

        for (const card of cards) {
            if (card.id === id) { 
                card.acerto = acerto
            }
        }

        data[materia] = cards;
        if (eWeb) await localStorage.setItem(chaveStorage, JSON.stringify(data));
        else await fileSystem.writeAsStringAsync(filePath, JSON.stringify(data, null, 2)); 
    }
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
