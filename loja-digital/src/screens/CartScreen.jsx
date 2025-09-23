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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu carrinho</Text>
    <Ionicons name="cart-outline" size={24} color="#fff" style={{ marginRight: 12 }} />
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
                onPress={() => removeOne(item.id)}
                style={styles.qtyBtn}>
                <Text style={styles.qtyTxt}>–</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => add(item, 1)}
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
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  title: { color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    gap: 10,
  },
  thumb: { width: 58, height: 58, borderRadius: 10 },
  name: { color: "#fff", fontWeight: "700" },
  price: { color: "#ADFF2F", marginTop: 4, fontWeight: "700" },
  actions: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyTxt: { color: "#fff", fontSize: 18, fontWeight: "800" },
  removeBtn: {
    backgroundColor: "#3A3A3A",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  removeTxt: { color: "#fff" },
  footer: { gap: 10, marginTop: 10 },
  total: { color: "#fff", fontWeight: "800", fontSize: 16 },
  checkoutBtn: {
    backgroundColor: "#2A7B3F",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  checkoutTxt: { color: "#fff", fontWeight: "800" },
  clearBtn: {
    backgroundColor: "#5a2424",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  clearTxt: { color: "#fff", fontWeight: "700" },
});
