import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions, View, Alert, TouchableOpacity, Text } from "react-native";
import Flashcard from "../components/Flashcard";
import CustomButton from "../components/CustomButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deletarFlashcard, editarFlashcard, buscarFlashcard } from "../scripts/comandosJson";

const router = useRouter()

export default function edicao() {
    const { width, height } = useWindowDimensions();
    const stripeWidth = width * 2.4;
    const stripeHeight = 150;
    const leftOffset = -width * 0.7;

    const id = useLocalSearchParams<{id: string}>().id
    const materia = useLocalSearchParams<{materia: string}>().materia
    
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };
    const [pergunta, setPergunta] = useState("")
    const [resposta, setResposta] = useState("")
    const [dificuldade, setDificuldade] = useState("médio")

    const importCard = async () => {
        const card = await buscarFlashcard(materia, Number(id))
        console.log(card)
        if (card != undefined) {
            setPergunta(card.pergunta)
            setResposta(card.resposta)
        }
    }
    
    const saveMudancas = async () => {
        await editarFlashcard(materia, Number(id), pergunta, resposta, dificuldade, "")
    }

    const delCard = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar o flashcard atual?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        await deletarFlashcard(materia, Number(id))
                        router.back()
                    },
                },
            ],
            { cancelable: true }
        )
    }

    useEffect(() => {importCard(); console.log(pergunta, resposta)}, [])
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
                frontText={pergunta}
                backText={resposta}
                onChangeFrontText={(text) => setPergunta(text)}
                onChangeBackText={(text) => setResposta(text)}
                width={300}
                height={400}
                borderRadius={10}
                editable={true}
                flashcardType="edicao"
                cardType="edicao"
                showFlipButton={true}
                onChangeDificuldade={(dificuldade) => setDificuldade(dificuldade)}
                onDelete={delCard}
            />
            <CustomButton
                title="Salvar"
                onPress={() => saveMudancas()}
                width={200}
                height={60}
                borderRadius={12}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#000000",
    },
});