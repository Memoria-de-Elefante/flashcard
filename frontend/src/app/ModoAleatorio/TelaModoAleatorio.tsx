import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";

export default function TelaModoDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { width, height } = useWindowDimensions();

 
  const fontSize_texto = width < 600 ? width * 0.06 : 30;
  const marginTop_texto = width < 600 ? 40 : 0;
  const marginBottom_texto = width < 600 ? 40 : 10;

 
  const stripeWidth = width * 2.2;
  const stripeHeight = 150;
  const leftOffset = -width * 0.7;

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

      
      <View style={{
        flexGrow: 1,
        maxHeight: width < 600 ? height * 0.45 : height * 0.6,
        width: width < 600 ? width * 0.8 : 600,
      }}>

        <ScrollView>
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
          <OptionButton
            label="Biologia"
            value="biologia"
            isSelected={selectedOption === 'biologia'}
            onPress={setSelectedOption}
          />
          <OptionButton
            label="Química"
            value="quimica"
            isSelected={selectedOption === 'quimica'}
            onPress={setSelectedOption}
          />
          <OptionButton
            label="Física"
            value="fisica"
            isSelected={selectedOption === 'fisica'}
            onPress={setSelectedOption}
          />
        </ScrollView>
      </View>

      <CustomButton
        title="Estudar"
        width={250}
        borderRadius={10}
        marginVertical={60}
        onPress={() => router.navigate('./FlashcardAleatorio')} 
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
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  deckBox: {
    width: "100%",
  },
});
