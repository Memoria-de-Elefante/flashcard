import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton"; // Ajuste o caminho conforme necessário
import { useRouter } from "expo-router";
import { criarJson, delJson } from "../scripts/comandosJson"

// Roteador do expo-router
const router = useRouter();
criarJson()

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tela Inicial Temporária</Text>
      <CustomButton title="Ir para login" 
        onPress={() => router.navigate("/TelaLogin")} // Direciona para a nova tela
        marginVertical={42}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 20,
  },
});
