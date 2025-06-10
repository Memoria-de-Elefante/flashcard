import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, SafeAreaView, View, StyleSheet, Dimensions, TextInput } from "react-native";
import CustomButton from "../components/CustomButton";
import Flashcard from "../components/Flashcard";
import { useRouter, useLocalSearchParams } from "expo-router";
import PagerView from 'react-native-pager-view';
import { editarMateria, buscarTodosFlashcards, adicionarFlashcard, Card, print } from "../scripts/comandosJson"
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const router = useRouter();

export default function TelaSelecaoCards({ }) {
    const materia = useLocalSearchParams<{materia: string}>().materia
    const [text, setText] = useState(materia);
    const [isEditing, setIsEditing] = useState(false)
    const [cards, setCards] = useState<Card[]>([])
    const [contador, setContador] = useState(1)

    const addCard = async () => {
        await adicionarFlashcard(materia, "Pergunta", "Resposta", "médio", "")
        setCards([...cards, {id: contador, pergunta:"Pergunta", resposta:"Resposta", dificuldade:"médio", imagem:""}])
        setContador(contador + 1)
    }

    const importCards = async () => {
        const flashcards = await buscarTodosFlashcards(materia)
        if (flashcards != undefined) {
            setCards(flashcards)
            setContador(flashcards.length + 1)
        }
    }

    const isFocused = useIsFocused()
        useEffect(() => {if (isFocused) {importCards()}}, [isFocused])
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.topRightIcon}>
                <Image source={require('../../assets/images/IconCompartilhar.png')} style={styles.iconCompartilhar} />
                {/* Configurar link para compartilhar ao ser clicado */}
            </SafeAreaView>

            <SafeAreaView style={styles.iconGroup}>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={(novoTexto) => setText(novoTexto)}
                        onBlur={() => {
                            editarMateria(materia, text)
                            setIsEditing(false)
                        }} // Fecha o input ao perder o foco
                        autoFocus
                    />
                ) : (
                    <Text style={styles.text}>{text}</Text>
                )}

                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsEditing(true)}>
                    <Image source={require('../../assets/images/IconEditar.png')} style={styles.image} />
                </TouchableOpacity>
            </SafeAreaView>

            <PagerView style={styles.pagerView} initialPage={0}>
                {cards.map(card => (
                    <View style={styles.page} key={card.id}>
                        <Flashcard
                            frontText={card.pergunta}
                            backText={card.resposta}
                            width={width * 0.8}
                            height={400}
                            borderRadius={10}
                            editable={false}
                            onPress={() => router.navigate({pathname: '/TelaEdicaoCard', params: {id: Number(card.id), materia: materia}})}
                        />
                    </View>
                ))}
            </PagerView>

            <CustomButton
                title="+"
                onPress={() => addCard()}
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        color: "#FFFFFF",
        fontSize: width * 0.08,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: width * 0.04,
        marginRight: 10,
    },
    image: {
        width: width * 0.09,
        height: width * 0.1,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    iconCompartilhar: {
        width: width * 0.09,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    topRightIcon: {
        width: '85%',
        alignItems: 'flex-end',
        paddingRight: 20,
        marginTop: 30,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    pagerView: {
        flex: 1,
        width: '100%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        fontWeight: "bold",
        color: '#FFFFFF',
        fontSize: width * 0.08,
        borderColor: '#FFFFFF'
    }

});
