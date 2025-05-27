import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Flashcard from "../../components/Flashcard";

export default function FlashcardDesafio() {
  return (
    <SafeAreaView style={styles.container}>
      <Flashcard
        frontText="Pergunta Desafio"
        backText="Resposta"
        width={300}
        height={400}
        borderRadius={10}
        flashcardType="desafio" // Passando o tipo para o Flashcard
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
  },
});
