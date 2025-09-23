import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { produtosMock } from "../data/produtosMock";
import CardItem from "../components/CardItem";

export default function CategoriaProduto({ route }) {
  const { categoria } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    
  };

  const itens = produtosMock.filter(
    (produto) => produto.categoria === categoria
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria}</Text>
      
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardItem
            item={item}
            onPress={() => handleItemPress(item)}
          />
        )}
      />

      {/* Modal de detalhes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedItem && (
                <>
                  <Image
                    source={
                      typeof selectedItem.imagem === "string"
                        ? { uri: selectedItem.imagem }
                        : selectedItem.imagem
                    }
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
                  <Text>{selectedItem.descricao}</Text>
                  <Text style={styles.modalPreco}>
                    Preço: R$ {selectedItem.preco.toFixed(2)}
                  </Text>
                  {selectedItem.Switch && (
                  <Text style={{ fontWeight: "bold" }}>
                  Switch: {selectedItem.Switch}
                  </Text>
                  )}
                  {selectedItem.tamanho && (
                  <Text style={{ fontWeight: "bold" }}>
                  Tamanho: {selectedItem.tamanho}
                  </Text>
                  )}
                    {selectedItem.Layout && (
                  <Text style={{ fontWeight: "bold" }}>
                  Layout: {selectedItem.Layout}
                  </Text>
                  )}
                  {selectedItem.Marca && (
                  <Text style={{ fontWeight: "bold" }}>
                  Marca: {selectedItem.Marca}
                  </Text>
                  )}
                  {selectedItem.cor && (
                  <Text style={{ fontWeight: "bold" }}>
                  Cor: {selectedItem.cor}
                  </Text>
                  )}
                   {selectedItem.conexao && (
                  <Text style={{ fontWeight: "bold" }}>
                  Conexão: {selectedItem.conexao}
                  </Text>
                  )}
                    {selectedItem.disponibilidade && (
                  <Text style={{ fontWeight: "bold" }}>
                  Disponibilidade: {selectedItem.disponibilidade}
                  </Text>
                  )}
                  {selectedItem.Frequência&& (
                  <Text style={{ fontWeight: "bold" }}>
                  Frequência: {selectedItem.Frequência}
                  </Text>
                  )}

                  {selectedItem.tipo && (
  <Text style={{ fontWeight: "bold" }}>
    Tipo: {selectedItem.tipo}
  </Text>
)}

                  {selectedItem.alergenicos && (
                    <Text style={{ color: "red" }}>
                      Alérgenos: {selectedItem.alergenicos.join(", ")}
                    </Text>
                  )}
                </>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    maxHeight: "90%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalPreco: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});