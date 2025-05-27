import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView,
    View,
    StyleSheet,
    useWindowDimensions,
    TextInput,
    ScrollView
} from "react-native";
import CustomButton from "../components/CustomButton";
import Flashcard from "../components/Flashcard";
import { useRouter } from "expo-router";

const router = useRouter();

export default function TelaSelecaoCards() {
    const [text, setText] = useState('Matéria');
    const [isEditing, setIsEditing] = useState(false);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    const borderRadius_cardFace = windowWidth < 600 ? windowWidth * 0.02 : 10;
    const width_flashcard = windowWidth < 600 ? windowWidth * 0.6 : 350;
    const height_flashcard = windowWidth < 600 ? windowWidth * 0.6 : 350;

    // TopRightIcon responsividade
    const paddingRight_topRightIcon = windowWidth < 600 ? windowWidth * 0.6 : 250;
    const marginTop_topRightIcon = windowWidth < 600 ? windowWidth * 0.45 : 25;

    // IconCompartilhar responsividade
    const size_iconCompartilhar = windowWidth < 600 ? windowWidth * 0.15 : 30;

    // IconGroup responsividade
    const gap_iconGroup = windowWidth < 600 ? 10 : 200;

    // Input responsividade
    const height_input = windowWidth < 600 ? 40 : 40;
    const margin_input = windowWidth < 600 ? 10 : 20;
    const borderWidth_input = 1;
    const padding_input = windowWidth < 600 ? 10 : 15;
    const fontSize_input = windowWidth < 600 ? 18 : 25;

    // Texto responsividade
    const fontSize_texto = windowWidth < 600 ? 22 : 30;
    const marginVertical_texto = windowWidth < 600 ? 10 : 15;
    const marginRight_texto = windowWidth < 600 ? 10 : 0;

    // Imagem responsividade
    const size_imagem = windowWidth < 600 ? 30 : 30;

    // Page padding horizontal
    const paddingHorizontal_page = windowWidth < 600 ? 20 : 300;

    return (
        <SafeAreaView style={[styles.container, { paddingHorizontal: paddingHorizontal_page }]}>
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
                        onChangeText={setText}
                        onBlur={() => setIsEditing(false)}
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
            >
                {[1, 2, 3, 4].map((num) => (
                    <View
                        style={[styles.page, { paddingHorizontal: paddingHorizontal_page }]}
                        key={num.toString()}
                    >
                        <Flashcard
                            frontText="Pergunta Aleatória"
                            backText="Resposta"
                            width={width_flashcard}
                            height={height_flashcard}
                            borderRadius={borderRadius_cardFace}
                            editable={false}
                            onPress={() => router.push('/TelaEdu')}
                        />

                    </View>
                ))}
            </ScrollView>

            <CustomButton
                title="+"
                onPress={() => alert("Criação de deck")}
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
        width: '100%',
        alignItems: 'flex-end',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 0,
        width: '102%',
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
