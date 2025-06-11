import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, useWindowDimensions, View } from "react-native";
import Flashcard from "../components/Flashcard";
import CustomButton from "../components/CustomButton";
import ListrasDeFundo from '../components/ListrasDeFundo';

export default function edicao() {

    const { width, height } = Dimensions.get('window');

    const cardRef = useRef<{ flipCard: () => void }>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        cardRef.current?.flipCard();
        setIsFlipped(prev => !prev);
    };
    // responsividae para listras
    return (
        <SafeAreaView style={styles.container}>
            
            <ListrasDeFundo />

            <Flashcard
                frontText="Pergunta de Edição"
                backText="Resposta de Edição"
                width={300}
                height={400}
                borderRadius={10}
                editable={true}
                flashcardType="edicao"
                showFlipButton={true}
            />
            <CustomButton
                title="Salvar"
                onPress={() => alert("Salvando o card")}
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
        overflow: 'hidden',
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
