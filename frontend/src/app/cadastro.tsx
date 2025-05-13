import { Text, Image, SafeAreaView, StyleSheet, Dimensions, TextInput, View, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import { router, useRouter } from 'expo-router';
import SenhaButton from "../components/SenhaButton";
import { useState } from "react";

const { width } = Dimensions.get('window');

export default function Cadastro({ }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/Poliedro.png')}
                style={styles.image}
            />
            <Text style={styles.text}>CADASTRO</Text>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail aqui"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Senha</Text>
            <SenhaButton title="Senha" onPress={() => alert("Altera a visibilidade da senha")} />
            <CustomButton title="Cadastrar" onPress={() => alert("Cadastrar")} />
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
    image: {
        width: width * 0.261,
        height: width * 0.1,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 0,
    },
    text: {
        color: "#FFFFFF",
        fontSize: width * 0.035,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.5,
        height: width * 0.027,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
});
