import React, { useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, Dimensions, TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link, router } from 'expo-router';
import SenhaButton from "../components/SenhaButton";
import { cadastroUser} from '@/data/api';

const { width } = Dimensions.get('window');

export default function TelaCadastro({ }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleCadastro = async () => {
        setMensagem('');
        try {
            const userData = await cadastroUser({nome, email, senha});
            if (userData) {
                router.push('/TelaInicial');
                console.log('Cadastro bem-sucedido!', userData);
            }
        } catch (error: any) {
            setMensagem(error.message || 'Erro ao fazer cadastro');
            console.error('Erro no cadastro: ', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/Poliedro.png')}
                style={styles.image}
            />
            <Text style={styles.text}>CADASTRO</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu nome aqui"
                placeholderTextColor="#7C7C7C"
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail aqui"
                placeholderTextColor="#7C7C7C"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite sua senha aqui"
                placeholderTextColor="#7C7C7C"
                value={senha}
                onChangeText={setSenha}
            />

            <CustomButton 
                title="Realizar Cadastro" 
                width={200}
                height={60}
                borderRadius={5}
                onPress={handleCadastro}  
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    image: {
        width: width * 0.6,
        height: width * 0.5,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    text: {
        color: "#FFFFFF",
        fontSize: width * 0.1,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: width * -0.05,
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 25,
        paddingHorizontal: width * 0.05,
        color: '#000',
        width: width * 0.7,
        height: width * 0.13,
        fontSize: 16,
    },
    label: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 10,
        padding: 10,
        alignSelf: 'flex-start',
        paddingLeft: width * 0.15,
    },
    link: {
        color: '#AAAAAA',
        textDecorationLine: 'underline',
        fontSize: width * 0.04,
    },
});
