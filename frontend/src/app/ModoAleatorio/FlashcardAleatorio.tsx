import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Flashcard from "../../components/Flashcard";

export default function FlashcardAleatorio() {
  return (
    <SafeAreaView style={styles.container}>
      <Flashcard
        frontText="Pergunta Aleatória"
        backText="Resposta"
        width={300}
        height={400}
        borderRadius={10}
        flashcardType="aleatorio" // Passando o tipo para o Flashcard
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
});
