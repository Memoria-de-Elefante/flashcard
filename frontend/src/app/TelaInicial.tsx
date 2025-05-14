// src/screens/TelaInicial.tsx
import React from "react";
import { Text, Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton"; // Ajuste o caminho de acordo com a estrutura
import { router } from "expo-router";

// Pegando a largura da tela
const { width } = Dimensions.get('window');

export default function TelaInicial() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/Poliedro.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Bem-vindo, aluno!</Text>
      <CustomButton 
        title="Jogar" 
        marginVertical={42}
        onPress={() => router.push('/TelaSelecaoModo')}  
      />
      <CustomButton 
        title="Editar Decks" 
        marginVertical={42}
        onPress={() => console.log("Indo para a tela Editar Decks")} 
      />
      <CustomButton 
        title="Sair da Conta" 
        marginVertical={42}
        onPress={() => console.log("Saindo da Conta")}  
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-start", // Alinha tudo no topo
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 0,
    paddingBottom: 0,
    flexDirection: 'column', // Garantir que os itens se organizem verticalmente
  },
  image: {
    width: width * 0.6,
    height: width * 0.5,
    resizeMode: 'contain', // Ajuste a forma de exibição da imagem
    marginBottom: 0, // Diminuímos a margem inferior para aproximar mais do texto
  },
  text: {
    color: "#FFFFFF",
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginTop: width * 0.01,
    marginBottom: width * 0.02,
    textAlign: "center",
  },
});
