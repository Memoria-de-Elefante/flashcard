import { Text, Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";

const { width } = Dimensions.get('window');

export default function edicao({}) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>SUA COLEÇÃO DE PALAVRAS</Text>
            <EdicaoButton title="Deck 1" onPress={() => alert("Abre o deck 1")} onEdit={() => alert("Editar deck")} onDelete={() => alert("Deletar deck")}/>
            <EdicaoButton title="Deck 2" onPress={() => alert("Abre o deck 2")} onEdit={() => alert("Editar deck")} onDelete={() => alert("Deletar deck")}/>
            <EdicaoButton title="Deck 3" onPress={() => alert("Abre o deck 3")} onEdit={() => alert("Editar deck")} onDelete={() => alert("Deletar deck")}/>
            <CustomButton textStyle={{fontSize: 40}} title="+" onPress={() => alert("Criação de deck")} />
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
        fontSize: width * 0.035,
        fontWeight: "bold",
        marginTop: width * 0.01,
        marginBottom: width * 0.01,
        textAlign: "center",
    },
});
