import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";

export default function TelaOpcoesDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { width: windowWidth } = useWindowDimensions();

 
  const fontSize_texto = windowWidth < 600 ? windowWidth * 0.075 : 30;
  const marginTop_texto = windowWidth < 600 ? 40 : 0;
  const marginBottom_texto = windowWidth < 600 ? 40 : 10;


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
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => router.navigate('./TelaModoDificuldade')}
      />
      <CustomButton
        title="Ver Estatísticas"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => router.navigate("../estatisticas")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 0,
    paddingBottom: 0,
    flexDirection: 'column', 
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
