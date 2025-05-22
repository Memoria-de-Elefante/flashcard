// Estatisticas.tsx


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SvgText } from 'react-native-svg';


interface Props {
  acertos: number;
  erros: number;
}

const Estatisticas = ({ acertos, erros }: Props) => {
  const total = acertos + erros;
  


  const data = [
    {
      key: 1,
      value: acertos,
      svg: { fill: '#2ecc71' }, // verde
      label: 'Acertos',
    },
    {
      key: 2,
      value: erros,
      svg: { fill: '#e74c3c' }, // vermelho
      label: 'Erros',
    },
  ];


  const Labels = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { pieCentroid, data } = slice;
      const percent = ((data.value / total) * 100).toFixed(1);
      return (
        <G key={index}>
          <SvgText
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={14}
            fontWeight="bold"
          >
            {percent}%
          </SvgText>
        </G>
      );
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>
      <PieChart
        style={{ height: 250 }}
        data={data}
        outerRadius={'90%'}
        innerRadius={'45%'}
        labelRadius={110}
      >
        <Labels />
      </PieChart>
      <View style={styles.legenda}>
        <Text style={styles.legendaTexto}>
          🟩 Acertos: {acertos}
        </Text>
        <Text style={styles.legendaTexto}>
          🟥 Erros: {erros}
        </Text>
      </View>
    </View>
  );
};


export default Estatisticas;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo preto
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
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





