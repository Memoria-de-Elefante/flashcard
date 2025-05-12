import { Text, Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton";
import { router, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Index({}) {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton title="Ir para login" onPress={() => router.push('/login')}/>
      <Image
        source={require('../../assets/images/Poliedro.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Bem-vindo, aluno!</Text>
      <CustomButton  title="Modo Aleatório"  onPress={() => console.log("Clicado no primeiro botão!")} 
      />
      <CustomButton  title="Modo Dificuldade"  onPress={() => console.log("Clicado no segundo botão!")} 
      />
      <CustomButton  title="Modo Desafio"  onPress={() => console.log("Clicado no terceiro botão!")} 
      />
      <CustomButton  title="Editar Decks"  onPress={() => console.log("Clicado no quarto botão!")} 
      />
      <CustomButton 
        title="Sair da Conta" 
        onPress={() => console.log("Clicado no quinto botão!")} 
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
    resizeMode: 'contain', // Ajuste a forma de exibição da imagem
    marginBottom: 0, // Diminuímos a margem inferior para aproximar mais do texto
  },
  text: {
    color: "#FFFFFF",
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginTop: width * -0.05,
    marginBottom: width * 0.04,
    textAlign: "center",
  },
});
