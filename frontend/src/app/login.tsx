import { Text, Image, SafeAreaView, StyleSheet, Dimensions, TextInput} from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from 'expo-router';
import SenhaButton from "../components/SenhaButton";

const { width } = Dimensions.get('window');

export default function Login({ }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/Poliedro.png')}
                style={styles.image}
            />
            <Text style={styles.text}>LOGIN</Text>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail aqui"
            />
            <Text style={styles.label}>Senha</Text>
            <SenhaButton title="Senha" onPress={() => alert("Altera a visibilidade da senha")} />
            <CustomButton title="Login" onPress={() => alert("Fazer login")} />
            <CustomButton textStyle={{color: 'white', textAlign: 'center', flexWrap: 'wrap', fontSize: 25}} style={styles.button} title="Não tem cadastro? Clique aqui" onPress={() => router.push('/cadastro')}/>
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
    button: {
        backgroundColor: "#000000",
        padding: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 0.005,
        width: width * 0.2,
        height: width * 0.05,
    }
});
