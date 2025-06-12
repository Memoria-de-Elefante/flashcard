import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";

export default function TelaOpcoesDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { width: windowWidth } = useWindowDimensions();

  // responsividade para o texto
  const fontSize_texto = windowWidth < 600 ? windowWidth * 0.075 : 30;
  const marginTop_texto = windowWidth < 600 ? 40 : 0;
  const marginBottom_texto = windowWidth < 600 ? 40 : 10;

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
        isSelected={selectedOption === 'fácil'}
        onPress={() => setSelectedOption('fácil')}
      />
      <OptionButton
        label="Questões Médias"
        value="médio"
        isSelected={selectedOption === 'médio'}
        onPress={() => setSelectedOption('médio')}
      />
      <OptionButton
        label="Questões Difíceis"
        value="difícil"
        isSelected={selectedOption === 'difícil'}
        onPress={() => setSelectedOption('difícil')}
      />
      <CustomButton
        title="Estudar"
        onPress={() => router.navigate({pathname: './TelaModoDificuldade', params: { dificuldade: selectedOption}})}
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
    fontWeight: "bold",
    textAlign: "center",
  },
});
