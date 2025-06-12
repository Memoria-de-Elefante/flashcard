import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions, View, Alert, TouchableOpacity, Text, Platform } from "react-native";
import Flashcard from "../components/Flashcard";
import CustomButton from "../components/CustomButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deletarFlashcard, editarFlashcard, buscarFlashcard } from "../scripts/comandosJson";
import * as ImagePicker from 'expo-image-picker';

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
    const [image, setImage] = useState("")

    const importCard = async () => {
        console.log(materia, id)
        const card = await buscarFlashcard(materia, id)
        console.log(card)
        if (card != undefined) {
            setPergunta(card.pergunta)
            setResposta(card.resposta)
            setImage(card.imagem)
        }
    }
    
    const saveMudancas = async () => {
        await editarFlashcard(materia, id, pergunta, resposta, dificuldade, image)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const delCard = async () => {
        if (Platform.OS === 'web') {
            const confirm = window.confirm(`Tem certeza que deseja deletar o flashcard atual?`)
            if (confirm) await confirmarExclusao(materia, id)
        }
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
                        await confirmarExclusao(materia, id)
                    },
                },
            ],
            { cancelable: true }
        )
    }

    const confirmarExclusao = async (materia: string, id: string) => {
        await deletarFlashcard(materia, id)
        router.back()
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
                ref={cardRef}
                frontText={pergunta}
                backText={resposta}
                onChangeFrontText={(text) => setPergunta(text)}
                onChangeBackText={(text) => setResposta(text)}
                width={300}
                height={400}
                borderRadius={10}
                editable={true}
                flashcardType="edicao"
                showFlipButton={true}
                onChangeDificuldade={(dificuldade) => setDificuldade(dificuldade)}
                onPickImage={pickImage}
                onDelete={delCard}
                imageURI={image}
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
