import React from "react";
import { Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton"; // Ajuste o caminho de acordo com a estrutura
import { router } from "expo-router";

// Pegando a largura da tela
const { width } = Dimensions.get('window');

export default function TelaSelecaoModo() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/Poliedro.png')}
        style={styles.image}
      />
      <CustomButton 
        title="Modo Aleatório" 
        marginVertical={42}
        onPress={() => router.push('/ModoAleatorio/TelaModoAleatorio')}  
      />
      <CustomButton 
        title="Modo Dificuldade" 
        marginVertical={42}
        onPress={() => router.push('/ModoDificuldade/TelaOpcoesDificuldade')}
      />
      <CustomButton 
        title="Modo Desafio" 
        marginVertical={42}
        onPress={() => router.push('/ModoDesafio/TelaModoDesafio')}  
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
});
