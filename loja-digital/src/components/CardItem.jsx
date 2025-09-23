import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';





export default function CardItem({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.card}
    > 
      <Image
        source={typeof item.imagem === 'string' ? 
          { uri: item.imagem } : item.imagem}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
         
        <Text style={styles.descricao} numberOfLines={2}>
          {item.descricao}
        </Text>
        <Text style={styles.preco}>
          R$ {item.preco.toFixed(2)}
        </Text>

        {item.alergenicos && item.alergenicos.length > 0 && (
          <Text style={styles.alergicos}>
            Alérgenos: {item.alergenicos.join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#356dfaff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // para sombra no Android
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    
  },
  preco: {
    fontSize: 16,
    color: '#000000ff',
    marginTop: 4,
    fontWeight: 'bold',
  },
  alergicos: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#000000ff',
    marginBottom: 8,
    fontWeight: 'bold',
  }


});








