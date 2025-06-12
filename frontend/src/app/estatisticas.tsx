import React, { useState, useRef, useEffect } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Animated,
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText } from 'react-native-svg';

const Estatisticas = () => {
const [mostrarGrafico, setMostrarGrafico] = useState(false);
const [acertos] = useState(12);
const [erros] = useState(3);
const fadeAnimBotao = useRef(new Animated.Value(1)).current;
const fadeAnimGrafico = useRef(new Animated.Value(0)).current;

const total = acertos + erros;

const data = [
{
key: 1,
value: acertos,
svg: { fill: '#2ecc71' },
label: 'Acertos',
},
{
key: 2,
value: erros,
svg: { fill: '#e74c3c' },
label: 'Erros',
},
];

const Labels = ({ slices }: any) => {
return slices.map((slice: any, index: number) => {
const { pieCentroid, data } = slice;
const percent = total === 0 ? 0 : (data.value / total) * 100;
if (percent === 0) return null;
return (
<G key={index}>
<SvgText x={pieCentroid[0]} y={pieCentroid[1]} fill="white" textAnchor="middle" alignmentBaseline="middle" fontSize={14} fontWeight="bold" >
{percent.toFixed(1)}%
</SvgText>
</G>
);
});
};

const handleGerarGrafico = () => {
Animated.timing(fadeAnimBotao, {
toValue: 0,
duration: 500,
useNativeDriver: true,
}).start(() => {
setMostrarGrafico(true);
Animated.timing(fadeAnimGrafico, {
toValue: 1,
duration: 800,
useNativeDriver: true,
}).start();
});
};

return (
<View style={styles.container}>
{!mostrarGrafico && (
<Animated.View style={{ opacity: fadeAnimBotao }}>
<TouchableOpacity style={styles.botao} onPress={handleGerarGrafico}>
<Text style={styles.botaoTexto}>Gerar Gráfico</Text>
</TouchableOpacity>
</Animated.View>
)}

php-template
Copiar
Editar
  {mostrarGrafico && (
    <Animated.View style={[styles.bordaBranca, { opacity: fadeAnimGrafico }]}>
      <View style={styles.conteudoGrafico}>
        <PieChart
          style={{ height: 220, width: 220 }}
          data={data.filter(item => item.value > 0)}
          outerRadius={'90%'}
          innerRadius={'45%'}
        >
          <Labels />
        </PieChart>
      </View>
    </Animated.View>
  )}

  <View style={styles.legenda}>
    <Text style={styles.legendaTexto}>🟩 Acertos: 12</Text>
    <Text style={styles.legendaTexto}>🟥 Erros: 3</Text>
  </View>
</View>
);
};

export default Estatisticas;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#000',
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
botao: {
paddingVertical: 12,
paddingHorizontal: 24,
borderWidth: 2,
borderColor: '#fff',
borderRadius: 8,
},
botaoTexto: {
color: '#fff',
fontSize: 18,
fontWeight: 'bold',
},
bordaBranca: {
height: 260,
width: 260,
borderRadius: 130,
backgroundColor: '#fff',
justifyContent: 'center',
alignItems: 'center',
},
conteudoGrafico: {
height: 220,
width: 220,
borderRadius: 110,
backgroundColor: '#000',
justifyContent: 'center',
alignItems: 'center',
},
legenda: {
marginTop: 20,
},
legendaTexto: {
fontSize: 18,
color: '#fff',
marginVertical: 4,
},
});