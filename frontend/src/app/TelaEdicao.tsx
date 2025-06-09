import React, { useState} from 'react';
import { Text, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";
import { buscarMaterias } from "../scripts/comandosJson"
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function edicao({}) {    
    const [botoes, SetBotoes] = useState<JSX.Element[]>([])
    const importMaterias = async () => {
        const materias = await buscarMaterias()
        
        if (materias != undefined) {
            const novosBotoes = materias.map((materia, index) => (
                <EdicaoButton
                    key={index}
                    title={materia || `Matéria ${index + 1}`}
                    onPress={() => router.push('/TelaSelecaoCards')}
                    onDelete={() => alert(`Deletar deck: ${materia}`)}
                />
            ))
            SetBotoes(novosBotoes)
        }
    }

    importMaterias()
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>SUA COLEÇÃO DE PALAVRAS</Text>

            <View style={styles.deckBox}>
                <ScrollView>
                    {botoes}
                </ScrollView>
            </View>

            <CustomButton
                title="+"
                onPress={() => {console.log("add")}}
                borderRadius={5}
                marginTop={50}
                textStyle={{ fontSize: 30 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "flex-start", // alinha tudo no topo
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 10,
        flexDirection: 'column', // Garantir que os itens se organizem verticalmente
    },
    text: {
        color: "#FFFFFF",
        fontSize: width * 0.06,
        fontWeight: "bold",
        marginTop: width * 0.1,
        marginBottom: width * 0.1,
        textAlign: "center",
    },
    deckBox: {
    height: height * 0.45, // altura máxima da "caixa invisível"
    width: "100%",
    paddingHorizontal: width * 0.1,
  },
});
