import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, Image, SafeAreaView, View, StyleSheet, useWindowDimensions, TextInput, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import Flashcard from "../components/Flashcard";
import { useRouter, useLocalSearchParams } from "expo-router";
import PagerView from 'react-native-pager-view';
import { editarMateria, buscarTodosFlashcards, adicionarFlashcard, Card, print } from "../scripts/comandosJson"
import { useIsFocused } from '@react-navigation/native';

const router = useRouter();

export default function TelaSelecaoCards({ }) {
    const materia = useLocalSearchParams<{materia: string}>().materia
    const [text, setText] = useState(materia);
    const [isEditing, setIsEditing] = useState(false)
    const [cards, setCards] = useState<Card[]>([])
    const [cardAtual, setCardAtual] = useState(0)
    const pagerRef = useRef<PagerView>(null)
    const { width: windowWidth } = useWindowDimensions();

    const borderRadius_cardFace = windowWidth < 600 ? windowWidth * 0.02 : 10;
    const width_flashcard = windowWidth < 600 ? windowWidth * 0.85 : 350;
    const height_flashcard = windowWidth < 600 ? windowWidth * 1 : 350;

    // TopRightIcon responsividade
    const paddingRight_topRightIcon = windowWidth < 600 ? windowWidth * 0 : 250;
    const marginTop_topRightIcon = windowWidth < 600 ? windowWidth * 0.1 : 25;

    // IconCompartilhar responsividade
    const size_iconCompartilhar = windowWidth < 600 ? windowWidth * 0.1 : 30;

    // IconGroup responsividade
    const gap_iconGroup = windowWidth < 600 ? 0 : 200;

    // Input responsividade
    const height_input = windowWidth < 600 ? 5 : 40;
    const margin_input = windowWidth < 600 ? 10 : 20;
    const borderWidth_input = 10;
    const padding_input = windowWidth < 600 ? 10 : 15;
    const fontSize_input = windowWidth < 600 ? 18 : 25;

    // Texto responsividade
    const fontSize_texto = windowWidth < 600 ? 30 : 30;
    const marginVertical_texto = windowWidth < 600 ? 20 : 15;
    const marginRight_texto = windowWidth < 600 ? 10 : 0;

    // Imagem responsividade
    const size_imagem = windowWidth < 600 ? 30 : 30;

    // Page padding horizontal
    const paddingHorizontal_page = windowWidth < 600 ? 30 : 300;

    // responsividae para listras
    const stripeWidth = windowWidth * 2.2;
    const stripeHeight = 150;
    const leftOffset = -windowWidth * 0.7;

    const addCard = async () => {
        const numAleatorio = Math.floor(Math.random() * (301 - 1 + 1)) + 1
        await adicionarFlashcard(numAleatorio, materia, "Pergunta", "Resposta")
        setCards([...cards, {id: numAleatorio, pergunta:"Pergunta", resposta:"Resposta", dificuldade:"médio", imagem:"", acerto: false}])
        setTimeout(() => {
            pagerRef.current?.setPage(cards.length)
        }, 100)
    }

    const importCards = async () => {
        const flashcards = await buscarTodosFlashcards(materia)
        if (flashcards != undefined) {
            setCards(flashcards)
            setTimeout(() => {
                const pageFocada = cardAtual >= flashcards.length ? Math.max(flashcards.length - 1, 0) : cardAtual
                setCardAtual(pageFocada)
                pagerRef.current?.setPage(pageFocada)
            }, 100)
        }
        
    }

    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {importCards()}
    }, [isFocused])

    return (
        <SafeAreaView style={[styles.container, { paddingHorizontal: paddingHorizontal_page }]}>
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
            <SafeAreaView
                style={[styles.topRightIcon, {
                    paddingRight: paddingRight_topRightIcon,
                    marginTop: marginTop_topRightIcon,
                }]}
            >
                <Image
                    source={require('../../assets/images/IconCompartilhar.png')}
                    style={[styles.iconCompartilhar, {
                        width: size_iconCompartilhar,
                        height: size_iconCompartilhar,
                    }]}
                />
            </SafeAreaView>

            <SafeAreaView style={[styles.iconGroup, { gap: gap_iconGroup }]}>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, {
                            height: height_input,
                            margin: margin_input,
                            borderWidth: borderWidth_input,
                            padding: padding_input,
                            fontSize: fontSize_input,
                        }]}
                        value={text}
                        onChangeText={(novoTexto) => setText(novoTexto)}
                        onBlur={() => {
                            editarMateria(materia, text)
                            setIsEditing(false)
                        }}
                        autoFocus
                    />
                ) : (
                    <Text style={[styles.text, {
                        fontSize: fontSize_texto,
                        marginVertical: marginVertical_texto,
                        marginRight: marginRight_texto,
                    }]}>{text}</Text>
                )}

                <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <Image
                        source={require('../../assets/images/IconEditar.png')}
                        style={[styles.image, {
                            width: size_imagem,
                            height: size_imagem,
                        }]}
                    />
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView 
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent} 
                key={cards.length}
                ref={pagerRef}
                initialPage={0}
            >
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
            </ScrollView>

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
        justifyContent: "flex-start",  // mantém itens no topo
        alignItems: "center",          // centraliza horizontalmente
        flexDirection: 'column',
    },

    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    image: {
        resizeMode: 'contain',
        marginBottom: 0,
    },
    iconCompartilhar: {
        resizeMode: 'contain',
    },
    topRightIcon: {
        width: '85%',
        alignItems: 'flex-end',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        width: '100%', // arrumar por aqui
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontWeight: "bold",
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderRadius: 5,
    }
});
