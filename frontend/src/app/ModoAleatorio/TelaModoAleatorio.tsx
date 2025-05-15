import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function TelaModoDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Selecione o deck que você deseja estudar</Text>

      {/* Caixa invisível para scrollar os decks */}
      <View style={styles.deckBox}>
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
        marginVertical={42}
        marginTop={60}
        onPress={() => router.push('./FlashcardAleatorio')} 
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
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginTop: width * 0.15,
    marginBottom: width * 0.05,
    textAlign: "center",
  },
  deckBox: {
    height: height * 0.45, // altura máxima da "caixa invisível"
    width: "100%",
    paddingHorizontal: width * 0.1,
  },
});
