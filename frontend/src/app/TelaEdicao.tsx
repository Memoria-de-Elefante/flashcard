import React, { useEffect, useState} from 'react';
import { Text, Alert, SafeAreaView, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";
import { buscarMaterias, deletarMateria, adicionarMateria } from "../scripts/comandosJson"
import { router } from "expo-router";
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function edicao({}) {    
    const [materias, setMaterias] = useState<string[]>([])
    const [contador, setContador] = useState(1)

    const addMat = async () => {
        const nomeMateria = `matéria ${contador}`
        await adicionarMateria(nomeMateria)
        setMaterias([...materias, nomeMateria])
        setContador(contador + 1)
    }

    const delMat = async (title: string) => {
        Alert.alert(
            'Confirmação',
            `Tem certeza que deseja deletar "${title}"?`,
            [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Deletar',
                style: 'destructive',
                onPress: () => {
                    deletarMateria(title)
                    setMaterias(materias.filter(materia => materia !== title))
                },
            },
            ],
            { cancelable: true }
        )
        setContador(contador - 1)
    }

    const importMaterias = async () => {
        const materias = await buscarMaterias()
        
        if (materias != undefined) {
            setMaterias(materias)
            setContador(materias.length + 1)
        }
    }
    
    const isFocused = useIsFocused()
    useEffect(() => {if (isFocused) {importMaterias()}}, [isFocused])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>SUA COLEÇÃO DE PALAVRAS</Text>

            <View style={styles.deckBox}>
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
        justifyContent: "flex-start", // alinha tudo no topo
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 10,
        flexDirection: 'column', // Garantir que os itens se organizem verticalmente
    },
    text: {
        color: "#FFFFFF",
        fontSize: width * 0.06,
        fontWeight: "bold",
        marginTop: width * 0.1,
        marginBottom: width * 0.1,
        textAlign: "center",
    },
    deckBox: {
    height: height * 0.45, // altura máxima da "caixa invisível"
    width: "100%",
    paddingHorizontal: width * 0.1,
  },
});
