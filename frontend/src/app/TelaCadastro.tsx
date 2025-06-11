import React, { useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, useWindowDimensions, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link, router } from 'expo-router';
import SenhaButton from "../components/SenhaButton";
import ListrasDeFundo from '../components/ListrasDeFundo';
import { cadastroUser } from '@/data/api';

// const { width } = Dimensions.get('window');

export default function TelaCadastro({ }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleCadastro = async () => {
        setMensagem('');

        // Validação dos campos
        if (!nome || !email || !senha) {
            alert('Preencha todos campos obrigatoriamente');
            return;
        }

        try {
            const userData = await cadastroUser({ nome, email, senha });
            if (userData) {
                alert('Cadastro bem-sucedido!');
                router.push('/TelaLogin');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('As informações inseridas são inválidas');
            } else {
                alert('Erro ao fazer cadastro');
                setMensagem(error.message || 'Erro ao fazer cadastro');
            }
            console.error('Erro no cadastro:', error);
        }
    }

    const { width: windowWidth } = useWindowDimensions();

    // responsividade para a imagem
    const width_imagem = windowWidth < 600 ? windowWidth * 0.6 : 300;
    const height_imagem = windowWidth < 600 ? windowWidth * 0.45 : 100;
    const marginBottom_imagem = windowWidth < 600 ? windowWidth * 0.05 : 0;
    const marginTop_imagem = windowWidth < 600 ? windowWidth * 0.07 : 10;

    // responsividade para o texto
    const fontSize_texto = windowWidth < 600 ? windowWidth * 0.1 : 30;
    const marginTop_texto = windowWidth < 600 ? windowWidth * -0.1 : 10;

    // responsividade para o texto (label)
    const fontSize_textoLabel = windowWidth < 600 ? windowWidth * 0.05 : 20;
    const marginTop_textoLabel = windowWidth < 600 ? windowWidth * 0.05 : 10;
    const padding_textoLabel = windowWidth < 600 ? windowWidth * 0.01 : 5;
    const paddingLeft_textoLabel = windowWidth < 600 ? windowWidth * 0.17 : 520;

    // responsividade para o input 
    const width_input = windowWidth < 600 ? windowWidth * 0.7 : 500;
    const height_input = windowWidth < 600 ? windowWidth * 0.1 : 30;
    const borderRadius_input = windowWidth < 600 ? windowWidth * 10 : 30;
    const fontSize_input = windowWidth < 600 ? windowWidth * 0.05 : 25;
    const marginTop_input = windowWidth < 600 ? windowWidth * 0.04 : 5;
    const paddingHorizontal_input = windowWidth < 600 ? windowWidth * 0.05 : 25;
    const paddingVertical_input = windowWidth < 600 ? windowWidth * 0.03 : 25;

    return (
        <SafeAreaView style={styles.container}>

            <ListrasDeFundo />

            <Image
                source={require('../../assets/images/Poliedro.png')}
                style={[
                    styles.image,
                    {
                        width: width_imagem,
                        height: height_imagem,
                        marginBottom: marginBottom_imagem,
                        marginTop: marginTop_imagem,
                    }
                ]}
            />
            <Text style={[
                styles.text,
                {
                    fontSize: fontSize_texto,
                    marginTop: marginTop_texto,
                }
            ]}>CADASTRO</Text>

            <Text style={[
                styles.label,
                {
                    fontSize: fontSize_textoLabel,
                    marginTop: marginTop_textoLabel,
                    padding: padding_textoLabel,
                    paddingLeft: paddingLeft_textoLabel,
                }
            ]}>Nome</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        width: width_input,
                        height: height_input,
                        borderRadius: borderRadius_input,
                        fontSize: fontSize_input,
                        marginTop: marginTop_input,
                        paddingHorizontal: paddingHorizontal_input,
                        paddingVertical: paddingVertical_input,
                        zIndex: 1,
                    }
                ]}
                placeholder="Digite seu nome aqui"
                placeholderTextColor="#7C7C7C"
                value={nome}
                onChangeText={setNome}
            />

            <Text style={[
                styles.label,
                {
                    fontSize: fontSize_textoLabel,
                    marginTop: marginTop_textoLabel,
                    padding: padding_textoLabel,
                    paddingLeft: paddingLeft_textoLabel,
                }
            ]}>E-mail</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        width: width_input,
                        height: height_input,
                        borderRadius: borderRadius_input,
                        fontSize: fontSize_input,
                        marginTop: marginTop_input,
                        paddingHorizontal: paddingHorizontal_input,
                        paddingVertical: paddingVertical_input,
                        zIndex: 1,
                    }
                ]}
                placeholder="Digite seu e-mail aqui"
                placeholderTextColor="#7C7C7C"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={[
                styles.label,
                {
                    fontSize: fontSize_textoLabel,
                    marginTop: marginTop_textoLabel,
                    padding: padding_textoLabel,
                    paddingLeft: paddingLeft_textoLabel,
                }
            ]}>Senha</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        width: width_input,
                        height: height_input,
                        borderRadius: borderRadius_input,
                        fontSize: fontSize_input,
                        marginTop: marginTop_input,
                        paddingHorizontal: paddingHorizontal_input,
                        paddingVertical: paddingVertical_input,
                        zIndex: 1,
                    }
                ]}
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
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'contain',
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        backgroundColor: '#eee',
        color: '#000',
    },
    label: {
        color: '#fff',
        fontWeight: "bold",
        alignSelf: 'flex-start',
    },
});
