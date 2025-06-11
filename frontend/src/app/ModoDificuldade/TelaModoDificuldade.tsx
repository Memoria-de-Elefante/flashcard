import React from "react";
import { Image, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../../components/CustomButton"; // Ajuste o caminho de acordo com a estrutura
import { router } from "expo-router";

export default function TelaModoDificuldade() {

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para a imagem
  const largura_imagem = windowWidth < 600 ? windowWidth * 0.6 : 300;
  const altura_imagem = windowWidth < 600 ? windowWidth * 0.45 : 100;
  const marginBottom_imagem = windowWidth < 600 ? windowWidth * 0.05 : 0;
  const marginTop_imagem = windowWidth < 600 ? windowWidth * 0.07 : 10;

    // responsividae para listras
  const stripeWidth = windowWidth * 2.2;
  const stripeHeight = 150;
  const leftOffset = -windowWidth * 0.7;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
              position: "absolute",
              width: stripeWidth,
              height: stripeHeight,
              transform: [{ rotate: "45deg" }],
              left: leftOffset,
              top: 0,
              backgroundColor: "#faa526",
            }} />
            <View style={{
              position: "absolute",
              width: stripeWidth,
              height: stripeHeight,
              transform: [{ rotate: "45deg" }],
              left: leftOffset,
              top: stripeHeight * 1.2,
              backgroundColor: "#ea2e57",
            }} />
            <View style={{
              position: "absolute",
              width: stripeWidth,
              height: stripeHeight,
              transform: [{ rotate: "45deg" }],
              left: leftOffset,
              top: stripeHeight * 2.4,
              backgroundColor: "#37b1bf",
            }} />
      <Image
        source={require('../../../assets/images/Poliedro.png')}
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
        title="Iniciar Sessão"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => router.push('./FlashcardDificuldade')}
      />
      <CustomButton
        title="Ver Estatísticas"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => console.log("Indo para Estatísticas")}
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
    resizeMode: 'contain',
  },
});
