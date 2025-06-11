import { Text, Image, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from 'expo-router';
import ListrasDeFundo from '../components/ListrasDeFundo';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index({ }) {

  const [nomeUsuario, setNomeUsuario] = useState('');

  // useEffect para puxar o nome do usuário
  useEffect(() => {
    const carregarNome = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem('usuario');
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          setNomeUsuario(usuario.nome);
        }
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error);
      }
    };

    carregarNome();
  }, []);

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para a imagem
  const largura_imagem = windowWidth < 600 ? windowWidth * 0.6 : 300;
  const altura_imagem = windowWidth < 600 ? windowWidth * 0.45 : 100;
  const marginBottom_imagem = windowWidth < 600 ? windowWidth * 0.05 : 0;

  // responsividade para o texto
  const fontSize_texto = windowWidth < 600 ? windowWidth * 0.08 : 30;
  const marginTop_texto = windowWidth < 600 ? windowWidth * 0 : 10;
  const marginBottom_texto = windowWidth < 600 ? windowWidth * 0 : 0;
  const marginTop_imagem = windowWidth < 600 ? windowWidth * 0.07 : 10;

  return (
    <SafeAreaView style={styles.container}>

      <ListrasDeFundo />

      <Image
        source={require('../../assets/images/Poliedro.png')}
        style={[
          styles.image,
          {
            width: largura_imagem,
            height: altura_imagem,
            marginBottom: marginBottom_imagem,
            marginTop: marginTop_imagem,
          }
        ]}
      />

      <Text style={[styles.text, {
        fontSize: fontSize_texto,
        marginTop: marginTop_texto,
        marginBottom: marginBottom_texto,
      }]}>
        Bem-vindo{nomeUsuario ? `, ${nomeUsuario}` : ''}!
      </Text>

      <CustomButton
        title="Jogar"
        marginVertical={20}
        borderRadius={5}
        onPress={() => router.push('/TelaSelecaoModo')}
      />
      <CustomButton
        title="Editar Decks"
        marginVertical={20}
        borderRadius={5}
        onPress={() => router.push('/TelaEdicao')}
      />

      <CustomButton
        title="Sair da Conta"
        marginVertical={20}
        borderRadius={5}
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('usuario');
          router.back(); 
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-start", // alinha tudo no topo
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 0,
    paddingBottom: 0,
    flexDirection: 'column', // Garantir que os itens se organizem verticalmente
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
});
