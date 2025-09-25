import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import { useCart } from "../context/CartContext";
import { toBRL } from "../services/format";
import api from "../services/api";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CartScreen() {
  const { items, removeOne, add, removeAll, clear, total } = useCart();

  // Function to handle decrease quantity with minimum check
  const handleDecrease = (item) => {
    if (item.qty > 1) {
      removeOne(item.id);
      Toast.show({
        type: "info",
        text1: "Quantidade reduzida",
        text2: `Quantidade do produto ${item.name} reduzida para ${item.qty - 1}`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Quantidade mínima",
        text2: "A quantidade mínima é 1. Para remover o item, use o botão Remover.",
      });
    }
  };

  // Function to handle increase quantity
  const handleIncrease = (item) => {
    add(item, 1);
    Toast.show({
      type: "success",
      text1: "Quantidade aumentada",
      text2: `Quantidade do produto ${item.name} aumentada para ${item.qty + 1}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu carrinho</Text>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        ListEmptyComponent={
          <Text style={{ color: "#bbb", marginTop: 20 }}>Carrinho vazio.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            {!!item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.thumb} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {toBRL(item.price)} • qnt: {item.qty}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => handleDecrease(item)}
                style={styles.qtyBtn}>
                <Text style={styles.qtyTxt}>–</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleIncrease(item)}
                style={styles.qtyBtn}>
                <Text style={styles.qtyTxt}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeAll(item.id)}
                style={styles.removeBtn}>
                <Text style={styles.removeTxt}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: {toBRL(total)}</Text>
        <TouchableOpacity
          disabled={!items.length}
          onPress={async () => {
            try {
              const order = {
                items,
                total,
                customerName: "Mesa 5", // ou coletar do usuário
              };
              await api.post("/orders", order);
              clear();
              Toast.show({
                type: "success",
                text1: "Pedido enviado!",
                text2: "Dirija-se ao balcão para pagar e retirar.",
              });
            } catch (e) {
              Toast.show({
                type: "error",
                text1: "Erro ao enviar pedido",
                text2: "Tente novamente",
              });
            }
          }}
          style={[styles.checkoutBtn, !items.length && { opacity: 0.5 }]}>
          <Text style={styles.checkoutTxt}>Finalizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!items.length}
          onPress={clear}
          style={[styles.clearBtn, !items.length && { opacity: 0.5 }]}>
          <Text style={styles.clearTxt}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  title: { color: "#2c3e50", fontSize: 22, fontWeight: "900", marginBottom: 20, textAlign: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  name: { color: "#2c3e50", fontWeight: "700", fontSize: 16 },
  price: { color: "#e74c3c", marginTop: 6, fontWeight: "700", fontSize: 14 },
  actions: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  qtyTxt: { color: "#2c3e50", fontSize: 20, fontWeight: "900" },
  removeBtn: {
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  removeTxt: { color: "#fff", fontWeight: "700" },
  footer: { gap: 14, marginTop: 20 },
  total: { color: "#2c3e50", fontWeight: "900", fontSize: 18, textAlign: "center" },
  checkoutBtn: {
    backgroundColor: "#2ecc71",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutTxt: { color: "#fff", fontWeight: "900", fontSize: 16 },
  clearBtn: {
    backgroundColor: "#e74c3c",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  clearTxt: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
