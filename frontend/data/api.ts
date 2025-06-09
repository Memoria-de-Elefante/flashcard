// Seção de integração com o frontend da aplicação
// import {fetch} from 'expo/fetch'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';
export const USER_STORAGE_KEY = 'userid';

// Cria uma instância do Axios com configurações base para reutilização e manutenção.
const api = axios.create({
  baseURL: API_URL, // Define a URL base da API
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo padrão para JSON
  },
  withCredentials: true
});

// Interceptor para tratar erros de resposta de forma centralizada.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Retorna um erro de rede genérico ou detalhes do erro do servidor.
    const errorMessage = error.response?.data?.error || `Erro ao fazer requisição: ${error.response?.status || 'Erro de rede'}`;
    return Promise.reject(new Error(errorMessage));
  }
);

export interface User {
  email: string;
  nome: string;
  senha: string;
  xata_createdat: Date; 
  xata_id: string;
  xata_updatedat: Date;
  xata_version: number;
}

export const cadastroUser = async (set:Partial<User>) => {
  try {
    const response = await api.post('http://192.168.15.6:3000/cadastro_usuario', {nome: set.nome,  email: set.email, senha: set.senha });
    console.log(response.data);

    if (!response.data) {
      console.error("response.data está indefinido. A API não retornou dados.");
      throw new Error("Dados da API não encontrados.");
    }

    const { user: { email, nome, xata_id }, token } = response.data;
    const userData = { user: { email, nome, xata_id}, token};
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  } catch (error: any) {
    console.error('Erro na requisição: ', error);
    throw error;
  }
};

export const loginUser = async (set: Partial<User>) => {
  try {
    const response = await api.post('http://192.168.15.6:3000/login_usuario', { email: set.email, senha: set.senha });
    const { user: { email, nome, xata_id }, token } = response.data;
    const userData = { user: { email, nome, xata_id }, token };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  } catch (error: any) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};