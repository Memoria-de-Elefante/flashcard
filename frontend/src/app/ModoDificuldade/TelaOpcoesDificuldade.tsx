import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";
import ListrasDeFundo from '../../components/ListrasDeFundo';

export default function TelaOpcoesDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para o texto
  const fontSize_texto = windowWidth < 600 ? windowWidth * 0.075 : 30;
  const marginTop_texto = windowWidth < 600 ? 40 : 0;
  const marginBottom_texto = windowWidth < 600 ? 40 : 10;

  return (
    <SafeAreaView style={styles.container}>

      <ListrasDeFundo />

      <Text style={[
        styles.text, {
          fontSize: fontSize_texto,
          marginTop: marginTop_texto,
          marginBottom: marginBottom_texto,
        }
      ]}>Selecione o deck que você deseja estudar</Text>
      <OptionButton
        label="Questões Fáceis"
        value="facil"
        isSelected={selectedOption === 'facil'}
        onPress={setSelectedOption}
      />
      <OptionButton
        label="Questões Médias"
        value="medio"
        isSelected={selectedOption === 'medio'}
        onPress={setSelectedOption}
      />
      <OptionButton
        label="Questões Difíceis"
        value="dificil"
        isSelected={selectedOption === 'dificil'}
        onPress={setSelectedOption}
      />
      <CustomButton
        title="Estudar"
        onPress={() => {
          if (selectedOption) {
            router.push('./TelaModoDificuldade');
          } else {
            alert('Por favor, selecione uma dificuldade antes de continuar.');
          }
        }}

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
    overflow: 'hidden',
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
