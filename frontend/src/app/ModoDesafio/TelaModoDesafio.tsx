import React from "react";
import { Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../../components/CustomButton"; // Ajuste o caminho de acordo com a estrutura
import { router } from "expo-router";

// Pegando a largura da tela
const { width } = Dimensions.get('window');

export default function TelaModoDesafio() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/Poliedro.png')}
        style={styles.image}
      />
      <CustomButton
        title="Iniciar Sessão"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => router.push('./FlashcardDesafio')}
      />
      <CustomButton
        title="Ver Estatísticas"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => console.log("Indo para Estatísticas")}
      />
    </SafeAreaView>
    // width: width ?? screenWidth * 0.45,
    // height: height ?? screenWidth * 0.15,
    // borderRadius: borderRadius ?? 15,
    // marginVertical: marginVertical ?? 0.045,
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
    marginBottom: 0, 
    marginTop: width * 0.07,
  },
});
