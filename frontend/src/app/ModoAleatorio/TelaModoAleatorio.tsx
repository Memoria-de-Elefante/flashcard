import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";

// Pegando a largura da tela
const { width } = Dimensions.get('window');

export default function TelaModoDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Selecione o deck que você deseja estudar</Text> 
    <OptionButton
      label="Matemática"
      value="matematica"
      isSelected={selectedOption === 'matematica'}
      onPress={setSelectedOption}
    />
    <OptionButton
      label="Português"
      value="portugues"
      isSelected={selectedOption === 'portugues'}
      onPress={setSelectedOption}
    />
    <OptionButton
      label="História"
      value="historia"
      isSelected={selectedOption === 'historia'}
      onPress={setSelectedOption}
    />
      <CustomButton 
        title="Estudar" 
        marginVertical={42}
        marginTop={115}
        onPress={() => router.push('./FlashcardAleatorio')} 
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
  text: {
    color: "#FFFFFF",
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginTop: width * 0.15,
    marginBottom: width * 0.05,
    textAlign: "center",
  },
});
