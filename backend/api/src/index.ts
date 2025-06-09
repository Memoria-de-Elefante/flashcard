import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getXataClient } from './xata';
import { UsersRecord } from './xata';

const PORT = 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:8081",
        "http://127.0.0.1:8081",
        "http://192.168.15.6:8081",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.15.6:3000"
    ],
    methods: [
        "GET",
        "POST"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Accept"
    ],
    exposedHeaders: ["Authorization"],
    credentials: true
}));

const client = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET!;

app.get('/get_all_data', async (req: Request, res: Response): Promise<void> => {
    const result = await client.db.users.getAll();
    res.json({ results: result });
});

app.post('/cadastro_usuario', async (req: Request, res: Response): Promise<void> => {
    const newUser: Omit<UsersRecord, 'xata_id' | 'senha'> = req.body; // Recebe todos os dados, exceto senha (trataremos a senha separadamente)
    const senha = req.body.senha; // Extrai a senha do corpo da requisição
    console.log(1)
    try {
        console.log(2)
        if (!newUser.nome || !newUser.email) {
            res.status(400).json({ error: 'Por favor, forneça nome, email e senha.' });
            return;
        } else if (!senha) {
            res.status(400).json({ error: 'Por favor, forneça nome, email e senha.' });
            return;
        }
        console.log(3)
        // 1. Checa e o email inserido já existe
        const existingUser = await client.db.users.filter({
            email: newUser.email
        }).getFirst();
        
        if (existingUser) {
            // Retorna 409 'Conflict status'
            res.status(409).json({error: 'Este email já está cadastrado! Por favor, utilize outro email ou faça login.'});
            return; // Retorno para a execução desse código
        }
        console.log(4)
        // 1. Criptografar a senha usando bcrypt
        const saltRounds = 5; // Número de rounds para o hash (mais alto = mais seguro, mais lento)
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        console.log(5)
        // 2. Criar o novo usuário com a senha criptografada
        const createUser = await client.db.users.create({ ...newUser, senha: hashedPassword });
        const { senha: hashedPasswordSentBack, ...userCreatedWithoutPassword } = createUser;
        res.status(200).json({ message: 'Cadastro bem-sucedido!', results: userCreatedWithoutPassword });
    } catch (error: any) {
        console.error("Erro ao fazer cadastro de usuário!", error.message);
        res.status(500).json({error: 'Erro ao fazer cadastro de usuário!'});
    }
})

app.post('/login_usuario', async (req: Request, res: Response) => {
    const { email, senha} = req.body;   // Faz a requisição dos valores de email e senha inseridos em body
    // console.log(email, senha);

    if (!email || !senha) {
        res.status(400).json({ error: 'Por favor, forneça email e senha.' });
        return;
    }
    // 2. Busca o usuário pelo email no banco de dados
    try {
        const getUser = await client.db.users.getFirst({
            filter: { email: email }
        });

        // 3. Verifica se o usuário existe
        if (!getUser) {
            res.status(401).json({error: "Credenciais inválidas!"});
            return;
        }
        
        // Compara a senha fornecida com o hash armazenado
        const isPasswordMatch = await bcrypt.compare(senha, getUser.senha);

        if (isPasswordMatch) {
            // 1. Criar o payload do token (informações que você quer incluir no token)
            const payload = {
                xata_id: getUser.xata_id,
                nome: getUser.nome,
                email: getUser.email,
            };
            // 2. Assinar o token com a chave secreta e definir opções (opcional)
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: '1h'
            });
            // 3. Enviar o token na resposta
            const { senha: hashedPassword, ...userWithoutPassword } = getUser;
            
            res.status(200).json({ message: 'Login bem-sucedido!', user: userWithoutPassword, token });

        } else {
            // 4. Senha incorreta
            res.status(401).json({ error: 'Credenciais inválidas!' });
        }

    } catch (error: any) {
        console.error("Erro ao fazer login de usuário!", error.message);
        res.status(500).json({error: 'Erro ao fazer login de usuário!'});
    }
})

// Ouvindo porta:
app.listen (PORT, () => {
    console.log(`Ouvindo porta ${PORT}`);
});