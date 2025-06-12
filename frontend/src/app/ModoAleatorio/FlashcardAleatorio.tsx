import React from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import Flashcard from "../../components/Flashcard";

export default function FlashcardAleatorio() {
  const { width: windowWidth } = useWindowDimensions();

 
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
      <Flashcard
        frontText="Pergunta Aleatória"
        backText="Resposta"
        width={300}
        height={400}
        borderRadius={10}
        flashcardType="aleatorio" 
        showFlipButton={true} 
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
