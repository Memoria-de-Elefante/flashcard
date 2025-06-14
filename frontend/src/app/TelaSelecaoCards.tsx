import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, Image, SafeAreaView, View, StyleSheet, useWindowDimensions, TextInput, ScrollView, Platform } from "react-native";
import CustomButton from "../components/CustomButton";
import Flashcard from "../components/Flashcard";
import { useRouter, useLocalSearchParams } from "expo-router";
import Carousel from 'react-native-reanimated-carousel'
import { editarMateria, buscarTodosFlashcards, adicionarFlashcard, Card, print } from "../scripts/comandosJson"
import { useIsFocused } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import * as uuidMobile from 'react-native-uuid'

const router = useRouter();

export default function TelaSelecaoCards({ }) {
    const materia = useLocalSearchParams<{materia: string}>().materia
    const [text, setText] = useState(materia);
    const [isEditing, setIsEditing] = useState(false)
    const [cards, setCards] = useState<Card[]>([])
    const [cardAtual, setCardAtual] = useState(0)
    const carouselRef = useRef<any>(null);
    const { width: windowWidth } = useWindowDimensions();

    // Variável confirma se a plataforma é web
    const eWeb = Platform.OS === 'web'

    const borderRadius_cardFace = windowWidth < 600 ? windowWidth * 0.02 : 10;
    const width_flashcard = windowWidth < 600 ? windowWidth * 0.85 : 350;
    const height_flashcard = windowWidth < 600 ? windowWidth * 1 : 350;

    
    const paddingRight_topRightIcon = windowWidth < 600 ? windowWidth * 0 : 250;
    const marginTop_topRightIcon = windowWidth < 600 ? windowWidth * 0.1 : 25;
    const marginLeft_topRightIcon = windowWidth < 600 ? windowWidth * 0.1 : 25;

    // IconCompartilhar responsividade
    const size_iconCompartilhar = windowWidth < 600 ? windowWidth * 0.1 : 30;

    // IconGroup responsividade
    const gap_iconGroup = windowWidth < 600 ? 0 : 20;

    
    const height_input = windowWidth < 600 ? 5 : 40;
    const margin_input = windowWidth < 600 ? 10 : 20;
    const borderWidth_input = 10;
    const padding_input = windowWidth < 600 ? 10 : 15;
    const fontSize_input = windowWidth < 600 ? 18 : 25;

    
    const fontSize_texto = windowWidth < 600 ? 30 : 30;
    const marginVertical_texto = windowWidth < 600 ? 20 : 15;
    const marginRight_texto = windowWidth < 600 ? 10 : 0;

    
    const size_imagem = windowWidth < 600 ? 30 : 30;

    
    const paddingHorizontal_page = windowWidth < 600 ? 30 : 300;

    
    const stripeWidth = windowWidth * 2.2;
    const stripeHeight = 150;
    const leftOffset = -windowWidth * 0.7;

    const addCard = async () => {
        let chaveAleatorio: string
        if (Platform.OS === "web") chaveAleatorio = uuidv4()
            else chaveAleatorio = uuidMobile.default.v4()
        await adicionarFlashcard(chaveAleatorio, materia, "Pergunta", "Resposta")
        setCards([...cards, {id: chaveAleatorio, pergunta:"Pergunta", resposta:"Resposta", dificuldade:"médio", imagem:"", backImage: "", acerto: false}])
        setTimeout(() => {
            carouselRef.current?.scrollTo({ index: cards.length, animated: true })
        }, 100);
    }

    const importCards = async () => {
        const flashcards = await buscarTodosFlashcards(materia)
        if (flashcards != undefined) {
            setCards(flashcards)
            setTimeout(() => {
                const pageFocada = cardAtual >= flashcards.length ? Math.max(flashcards.length - 1, 0) : cardAtual
                setCardAtual(pageFocada)
                carouselRef.current?.scrollTo({ index: pageFocada, animated: true })
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
                style={[styles.topRightIcon, eWeb ? {
                    paddingRight: paddingRight_topRightIcon + 50,
                    marginTop: marginTop_topRightIcon,
                    marginLeft: marginLeft_topRightIcon,
                } : {
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
            
            
            <SafeAreaView style={[styles.iconGroup, eWeb && { gap: gap_iconGroup }]}>
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

            <Carousel
                ref={carouselRef}
                loop={false}
                width={windowWidth - 50}
                height={height_flashcard + 15}
                data={cards}
                key={cards.length}
                scrollAnimationDuration={500}
                onSnapToItem={index => setCardAtual(index)} // ← importante manter isso
                renderItem={({ item }) => (
                    <View style={[styles.page]}>
                        <Flashcard
                            frontText={item.pergunta}
                            backText={item.resposta}
                            width={width_flashcard * .95}
                            height={height_flashcard}
                            borderRadius={borderRadius_cardFace}
                            editable={false}
                            onPress={() =>
                                router.navigate({
                                    pathname: '/TelaEdicaoCard',
                                    params: { id: item.id, materia }
                                })
                            }
                            imageURI={item.imagem}
                        />
                    </View>
                )}
                style={styles.carrossel}
            />

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
        borderRadius: 10,
    },
    carrossel: {
        justifyContent: "center",
        alignItems: "center"
    }
});
