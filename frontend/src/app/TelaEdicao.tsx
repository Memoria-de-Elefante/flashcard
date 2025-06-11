import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView, View } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";
import { router } from "expo-router";

export default function Edicao() {
    const { width, height } = useWindowDimensions();

    // Responsividade para o texto
    const fontSize_texto = width < 600 ? width * 0.06 : 30;
    const marginTop_texto = width < 600 ? 40 : 0;
    const marginBottom_texto = width < 600 ? 40 : 10;

    // responsividae para listras
    const stripeWidth = width * 2.2;
    const stripeHeight = 150;
    const leftOffset = -width * 0.7;

    return (
        <SafeAreaView style={[styles.container]}>
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
            ]}>
                SUA COLEÇÃO DE PALAVRAS
            </Text>

            <View style={[
                styles.deckBox, {
                    flexGrow: 1,
                    maxHeight: width < 600 ? height * 0.45 : height * 0.6,
                    width: width < 600 ? width * 0.8 : 600,
                }
            ]}>
                <ScrollView>
                    {["Matemática", "Português", "História", "Biologia", "Química", "Física"].map((item) => (
                        <EdicaoButton
                            key={item}
                            title={item}
                            onPress={() => router.push('/TelaSelecaoCards')}
                            onDelete={() => alert("Deletar deck")}
                        />
                    ))}
                </ScrollView>
            </View>

            <CustomButton
                title="+"
                onPress={() => alert("Criação de deck")}
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
        paddingBottom: 10,
        flexDirection: 'column',
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
