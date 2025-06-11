import { Text, Image, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from 'expo-router';

export default function Index({ }) {

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
      <Text style={[
        styles.text,
        {
          fontSize: fontSize_texto,
          marginTop: marginTop_texto,
          marginBottom: marginBottom_texto,
        }
      ]}>Bem-vindo, aluno!</Text>
      {/* Colocar um parâmetro para puxar o nome do usuário pelo token */}

      <CustomButton
        title="Jogar"
        marginVertical={20}
        borderRadius={5}
        onPress={() => router.navigate('/TelaSelecaoModo')}  
      />
      <CustomButton
        title="Editar Decks"
        marginVertical={20}
        borderRadius={5}
        onPress={() => router.navigate('/TelaEdicao')} 
      />
      <CustomButton
        title="Sair da Conta"
        marginVertical={20}
        borderRadius={5}
        onPress={() => console.log("Saindo da Conta")}
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
