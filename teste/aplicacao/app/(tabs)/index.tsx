import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { loginUser } from '../../data/api'; // Importe a função loginUser
// ... outros imports

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async () => {
    console.log('running');
    setMensagem(''); // Limpa mensagens anteriores
    try {
      console.log(email, senha);
      const userData = await loginUser({ email, senha });
      if (userData) {
        // Navegue para outra tela (ex: Home)
        console.log('Login bem-sucedido!', userData);
        // Ex: navigation.navigate('Home');
      }
    } catch (error: any) {
      // Exiba a mensagem de erro para o usuário
      setMensagem(error.message || 'Erro ao fazer login');
      console.error('Erro no login:', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} />
      <Button title="Entrar" onPress={handleLogin} />
      <Text>{mensagem}</Text>
    </View>
  );
};

export default LoginScreen;