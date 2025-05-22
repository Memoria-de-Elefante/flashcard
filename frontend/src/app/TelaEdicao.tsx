import React, { useState} from 'react';
import { Text, Image, SafeAreaView, StyleSheet, Dimensions, ScrollView, View } from "react-native";
import CustomButton from "../components/CustomButton";
import EdicaoButton from "../components/EdicaoButton";
import ModalComponent from "../components/ModalComponent";

const { width, height } = Dimensions.get('window');

export default function edicao({}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {setIsModalOpen(true)}
    const closeModal = () => {setIsModalOpen(false)}

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>SUA COLEÇÃO DE PALAVRAS</Text>

            <View style={styles.deckBox}>
                <ScrollView>
                    <EdicaoButton 
                        title="Matemática" 
                        onPress={() => alert("Abre o deck Matemática")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                    <EdicaoButton 
                        title="Português" 
                        onPress={() => alert("Abre o deck Português")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                    <EdicaoButton 
                        title="História" 
                        onPress={() => alert("Abre o deck História")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                    <EdicaoButton 
                        title="Biologia" 
                        onPress={() => alert("Abre o deck Biologia")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                    <EdicaoButton 
                        title="Química" 
                        onPress={() => alert("Abre o deck Química")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                    <EdicaoButton 
                        title="Física" 
                        onPress={() => alert("Abre o deck Física")} 
                        onEdit={() => alert("Editar deck")} 
                        onDelete={() => alert("Deletar deck")}
                    />
                </ScrollView>
            </View>

            <ModalComponent isOpen={isModalOpen} onClose={closeModal} onSave={() => console.log("Salvando...")}/>
            <CustomButton
                title="+"
                onPress={openModal}
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
