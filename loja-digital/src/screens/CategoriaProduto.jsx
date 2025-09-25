import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import ProductService from "../services/productService";
import CardItem from "../components/CardItem";

export default function CategoriaProduto({ route }) {
  const { categoria } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos quando o componente montar
  useEffect(() => {
    loadProducts();
  }, [categoria]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await ProductService.getProductsByCategory(categoria);
      setItens(products);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria}</Text>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#356dfaff" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadProducts}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
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
      )}

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
                    resizeMode="contain"
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
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
    textAlign: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 0,
    maxHeight: "90%",
    overflow: "hidden",
  },
  modalImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#f8f9fa",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2c3e50",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalPreco: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  closeButton: {
    marginTop: 24,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "#e74c3c",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
