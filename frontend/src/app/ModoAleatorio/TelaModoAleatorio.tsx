import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView, View, Platform, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import OptionButton from "../../components/OptionButton";
import { router } from "expo-router";
import { buscarMaterias, Card } from "../../scripts/comandosJson"

export default function TelaModoDificuldade() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [materias, setMaterias] = useState<string[]>([])

  const { width, height } = useWindowDimensions();

 
  const fontSize_texto = width < 600 ? width * 0.06 : 30;
  const marginTop_texto = width < 600 ? 40 : 0;
  const marginBottom_texto = width < 600 ? 40 : 10;

 
  const stripeWidth = width * 2.2;
  const stripeHeight = 150;
  const leftOffset = -width * 0.7;

  const importMaterias = async () => {
    const materias = await buscarMaterias()

    if (materias != undefined) {
      setMaterias(materias)
    }
  }

  useEffect(() => { importMaterias() }, [])
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
          {materias.map(materia => (
            <OptionButton
              label={materia}
              value={materia}
              isSelected={selectedOption === materia}
              onPress={() => setSelectedOption(materia)}
            />
          ))}
        </ScrollView>
      </View>

      <CustomButton
        title="Estudar"
        width={250}
        borderRadius={10}
        marginVertical={60}
        marginTop={60}
        onPress={() => {
          if (selectedOption) {
            router.navigate({ pathname: './FlashcardAleatorio', params: { materia: selectedOption } })
          }
          else {
            if (Platform.OS === "web") {
              alert("É necessário selecionar um deck para prosseguir.")
            }
            else {
              Alert.alert(
                "Aviso",
                "É necessário selecionar um deck para prosseguir.",
                [
                  {
                    text: "Confirmar",
                    onPress: () => {},
                  },
                ],
                { cancelable: false }
              );
            }
          }
        }}
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
