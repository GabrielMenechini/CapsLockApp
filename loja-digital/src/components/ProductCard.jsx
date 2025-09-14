import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { toBRL } from "../services/format";
import { useCart } from "../context/CartContext"; // Adicione este import

export default function ProductCard({ item, onPress }) {
  const { add } = useCart(); // Use o contexto do carrinho

  return (
    <View style={styles.card}>
      {!!item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        onPress={onPress}
        style={{ paddingHorizontal: 14, paddingTop: 12 }}>
        <Text style={styles.title}>{item.name}</Text>
        {!!item.description && (
          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <Text style={styles.price}>{toBRL(item.price)}</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.detailsBtn} onPress={onPress}>
          <Text style={styles.detailsTxt}>Ver detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => add(item, 1)} // Adiciona ao carrinho
        >
          <Text style={styles.addTxt}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ...existing styles...

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    marginVertical: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  title: { color: "#fff", fontWeight: "800", fontSize: 18 },
  desc: { color: "#CFCFCF", marginTop: 4 },
  price: { color: "#ADFF2F", marginTop: 8, fontWeight: "800" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  detailsBtn: {
    backgroundColor: "#2A2A2A",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  detailsTxt: { color: "#fff", fontWeight: "600" },
  addBtn: {
    backgroundColor: "#2A7B3F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addTxt: { color: "#fff", fontWeight: "700" },
});
