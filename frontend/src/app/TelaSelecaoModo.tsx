import React from "react";
import { Image, SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import CustomButton from "../components/CustomButton"; // Ajuste o caminho de acordo com a estrutura
import { router } from "expo-router";

export default function TelaSelecaoModo() {

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para a imagem
  const largura_imagem = windowWidth < 600 ? windowWidth * 0.6 : 300;
  const altura_imagem = windowWidth < 600 ? windowWidth * 0.45 : 100;
  const marginBottom_imagem = windowWidth < 600 ? windowWidth * 0.05 : 0;
  const marginTop_imagem = windowWidth < 600 ? windowWidth * 0.07 : 10;

  return (
    <SafeAreaView style={styles.container}>
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
    resizeMode: 'contain', // Ajuste a forma de exibição da imagem
  },
});
