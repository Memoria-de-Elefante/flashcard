import React from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import Flashcard from "../../components/Flashcard";
import ListrasDeFundo from '../../components/ListrasDeFundo';

export default function FlashcardAleatorio() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      
      <ListrasDeFundo />

      <Flashcard
        frontText="Pergunta Aleatória"
        backText="Resposta"
        width={300}
        height={400}
        borderRadius={10}
        flashcardType="aleatorio" // Passando o tipo para o Flashcard
        showFlipButton={true} // Caso queira que o botão flip apareça ou não
        editable={false}
        style={{ marginTop: 60 }}
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
    overflow: 'hidden',
  },
});
