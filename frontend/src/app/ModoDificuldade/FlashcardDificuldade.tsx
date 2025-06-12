import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import Flashcard, { FlashcardHandle } from "../../components/Flashcard";
import { router, useLocalSearchParams } from "expo-router";
import { buscarMaterias, buscarTodosFlashcards, Card, foiAcerto } from "@/src/scripts/comandosJson";

export default function FlashcardDificuldade() {
  const { dificuldade } = useLocalSearchParams<{ dificuldade: string }>()
  const [cards, setCards] = useState<Card[]>([])
  const [cardAtual, setCardAtual] = useState<Card | null>(null)
  const flashcardRef = useRef<FlashcardHandle>(null)

  const { width: windowWidth } = useWindowDimensions();

  // responsividae para listras
  const stripeWidth = windowWidth * 2.2;
  const stripeHeight = 150;
  const leftOffset = -windowWidth * 0.7;

  const importCards = async () => {
    const auxMats = await buscarMaterias()
    if (!auxMats) return

    let flashcards: Card[] = []
    for (const materia of auxMats) {
      const cards = await buscarTodosFlashcards(materia)
      if (cards) {
        let auxCards: Card[] = []
        for (const card of cards) {
          if (card.dificuldade === dificuldade) auxCards = auxCards.concat(card)
        }
        const cardsComMateria = auxCards.map(card => ({ ...card, materia }))
        flashcards = flashcards.concat(cardsComMateria)
      }
    }
    if (flashcards && flashcards.length > 0) {
      flashcards.sort(() => Math.random() - 0.5);
      setCards(flashcards);
      setCardAtual(flashcards[0]);
    }
  }

  const proximoCard = async (acertoSelecionado: boolean) => {
    if (cardAtual) {
      await foiAcerto(cardAtual.materia, cardAtual.id, acertoSelecionado)
    }

    const novosCards = [...cards];
    novosCards.shift();
    setCards(novosCards);
    setTimeout(() => {
      flashcardRef.current?.flipCard()
    }, 300)

    if (novosCards.length > 0) {
      setCardAtual(novosCards[0]);
    }
    else {
      if (Platform.OS === "web") {
        alert("Você chegou ao fim de seus flashcards!");
        router.back(); router.back()
      }
      else {
        Alert.alert(
          "Parabéns",
          "Você chegou ao fim de seus flashcards!",
          [
            {
              text: "Continuar",
              onPress: () => { router.back(); router.back() },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }

  useEffect(() => {
    importCards()
  }, [])

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

      {cardAtual && (
        <Flashcard
          ref={flashcardRef}
          frontText={cardAtual.pergunta}
          backText={cardAtual.resposta}
          width={300}
          height={400}
          borderRadius={10}
          flashcardType="dificuldade" 
          showFlipButton={true}
          editable={false}
          style={{ marginTop: 60 }}
          onChangeAcerto={(acerto) => {
            proximoCard(acerto)
          }}
          imageURI={cardAtual.imagem}
        />
      )}
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
