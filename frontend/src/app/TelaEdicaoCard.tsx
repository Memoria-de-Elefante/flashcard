import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import Flashcard from "../components/Flashcard";
import CustomButton from "../components/CustomButton";
import { buscarFlashcard, editarFlashcard } from "../scripts/comandosJson";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get('window');


export default function edicao() {
    const id = useLocalSearchParams<{id: string}>().id
    const materia = useLocalSearchParams<{materia: string}>().materia
    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };
    const [pergunta, setPergunta] = useState("a")
    const [resposta, setResposta] = useState("a")

    const importCard = async () => {
        const card = await buscarFlashcard(materia, id)
        if (card != undefined) {
            setPergunta(card.pergunta)
            setResposta(card.resposta)
        }
    }
    
    const saveMudancas = async () => {
        await editarFlashcard(materia, Number(id), pergunta, resposta, "fácil", "")
    }

    useEffect(() => {importCard(); console.log(pergunta, resposta)}, [])
    return (
        <SafeAreaView style={styles.container}>
            <Flashcard
                ref={cardRef}
                frontText={pergunta}
                backText={resposta}
                width={300}
                height={400}
                borderRadius={10}
                editable={true}
                flashcardType="edicao"
                showFlipButton={true}
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
    arrowText: {
        fontSize: 24,
        color: 'white',
    },
    arrowLeft: {
        position: 'absolute',
        left: '30%',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
    arrowRight: {
        position: 'absolute',
        right: '30%',
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
});
