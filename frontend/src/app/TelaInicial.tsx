import { Text, Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Index({}) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/Poliedro.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Bem-vindo, aluno!</Text>
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
    width: width * 0.6,
    height: width * 0.5,
    resizeMode: 'contain', 
    marginBottom: 0, 
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
