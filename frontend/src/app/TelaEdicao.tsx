import React, { useEffect, useState} from 'react';
import { Text, Alert, SafeAreaView, StyleSheet, useWindowDimensions, ScrollView, View, Platform } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";
import { buscarMaterias, deletarMateria, adicionarMateria, retornaJson } from "../scripts/comandosJson"
import { router } from "expo-router";
import { useIsFocused } from '@react-navigation/native';
import { criarBackup, receberBackup } from '@/data/api';

export default function edicao() {    
    const { width, height } = useWindowDimensions();
    // Responsividade para o texto
    const fontSize_texto = width < 600 ? width * 0.06 : 30;
    const marginTop_texto = width < 600 ? 40 : 0;
    const marginBottom_texto = width < 600 ? 40 : 10;

    // responsividae para listras
    const stripeWidth = width * 2.2;
    const stripeHeight = 150;
    const leftOffset = -width * 0.7;
    
    const [materias, setMaterias] = useState<string[]>([])
    const [contador, setContador] = useState(1)

    const addMat = async () => {
        const nomeMateria = `matéria ${contador}`
        await adicionarMateria(nomeMateria)
        setMaterias([...materias, nomeMateria])
        setContador(contador + 1)
    }

    const delMat = async (title: string) => {
        if (Platform.OS === 'web') {
                const confirm = window.confirm(`Tem certeza que deseja deletar ${title}?`)
                if (confirm) confirmarExclusao(title)
        }
        Alert.alert(
            'Confirmação',
            `Tem certeza que deseja deletar ${title}?`,
            [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Deletar',
                style: 'destructive',
                onPress: () => confirmarExclusao(title),
            },
            ],
            { cancelable: true }
        )
        setContador(contador - 1)
    }

    const confirmarExclusao = (title: string) => {
        deletarMateria(title)
        setMaterias(materias.filter(materia => materia !== title))
    }

    const importMaterias = async () => {
        const materias = await buscarMaterias()
        
        if (materias != undefined) {
            setMaterias(materias)
            setContador(materias.length + 1)
        }
    }
    
    const fazerBackup = () => {
        const json = retornaJson()
        if (json) criarBackup(json)
    }
    const puxarBackup = () => {
        const jsonBackup = receberBackup()
        if (jsonBackup) salvarBackup(jsonBackup)
    }

    const isFocused = useIsFocused()
    useEffect(() => {if (isFocused) {importMaterias()}}, [isFocused])
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
                    {materias.map(materia => (
                        <EdicaoButton
                            key={materia}
                            title={materia}
                            onPress={() => {router.navigate({pathname: '/TelaSelecaoCards', params: {materia}})}}
                            onDelete={() => {delMat(materia)}}
                        />
                    ))}
                </ScrollView>
            </View>

            <CustomButton
                title="+"
                onPress={() => addMat()}
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
