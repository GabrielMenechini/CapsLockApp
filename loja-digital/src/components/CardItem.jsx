import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';

export default function CardItem({ item, onPress }) {
  const { add } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: item.id,
      name: item.nome,
      price: item.preco,
      imageUrl: item.imagem,
      qty: 1
    };
    add(cartItem, 1);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={typeof item.imagem === 'string' ?
            { uri: item.imagem } : item.imagem}
          style={styles.image}
        />
        {item.disponibilidade === 'Esgotado' && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>ESGOTADO</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>

        <Text style={styles.descricao} numberOfLines={2}>
          {item.descricao}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.preco}>
            R$ {item.preco.toFixed(2)}
          </Text>
          {item.disponibilidade === 'Esgotado' && (
            <Text style={styles.unavailableText}>Indisponível</Text>
          )}
        </View>

        {item.alergenicos && item.alergenicos.length > 0 && (
          <Text style={styles.alergicos}>
            Alérgenos: {item.alergenicos.join(', ')}
          </Text>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          disabled={item.disponibilidade === 'Esgotado'}
        >
          <Text style={styles.addButtonText}>
            {item.disponibilidade === 'Esgotado' ? 'Indisponível' : 'Adicionar ao carrinho'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f8f9fa',
    alignItems: 'flex-start',
    padding: 8,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    padding: 16,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 20,
  },
  descricao: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  unavailableText: {
    fontSize: 12,
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  alergicos: {
    fontSize: 12,
    color: '#e74c3c',
    marginTop: 8,
    fontWeight: '500',
  },
  addButton: {
    marginTop: 12,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});








