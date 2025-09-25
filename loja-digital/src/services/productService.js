import { api } from './api.js';

// Serviço para gerenciar produtos via API
class ProductService {

  /**
   * Busca todos os produtos da API
   * @returns {Promise<Array>} Lista de produtos
   */
  async getAllProducts() {
    try {
      const response = await api.get('/products');
      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Não foi possível carregar os produtos');
    }
  }

  /**
   * Busca um produto específico por ID
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Produto encontrado
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Produto não encontrado');
    }
  }

  /**
   * Cria um novo produto
   * @param {Object} productData - Dados do produto
   * @returns {Promise<Object>} Produto criado
   */
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Não foi possível criar o produto');
    }
  }

  /**
   * Atualiza um produto existente
   * @param {number} id - ID do produto
   * @param {Object} productData - Dados para atualização
   * @returns {Promise<Object>} Produto atualizado
   */
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new Error('Não foi possível atualizar o produto');
    }
  }

  /**
   * Remove um produto
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Produto removido
   */
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw new Error('Não foi possível remover o produto');
    }
  }

  /**
   * Mapeia produto da API para formato do app
   * @param {Object} apiProduct - Produto da API
   * @param {string} category - Categoria do produto
   * @returns {Object} Produto mapeado
   */
  mapProductToAppFormat(apiProduct, category) {
    return {
      id: apiProduct.id,
      nome: apiProduct.name,
      descricao: apiProduct.description,
      preco: apiProduct.price,
      categoria: category,
      // Campos adicionais que podem ser necessários
      sku: apiProduct.sku,
      // Adicionar campos padrão se não existirem na API
      modelo: apiProduct.modelo || 'Não informado',
      conexao: apiProduct.conexao || 'Não informado',
      cor: apiProduct.cor || 'Não informado',
      disponibilidade: apiProduct.disponibilidade || 'Disponível',
      
      imagem: apiProduct.image || null
    };
  }

  /**
   * Busca produtos filtrados por categoria
   * @param {string} category - Categoria dos produtos
   * @returns {Promise<Array>} Lista de produtos da categoria
   */
  async getProductsByCategory(category) {
    try {
      const allProducts = await this.getAllProducts();
      // Filtrar produtos pela categoria correta
      const filteredProducts = allProducts.filter(product => {
        // Mapear nome do produto para categoria
        const name = product.name.toLowerCase();
        if (category.toLowerCase() === 'mouses e gamepad') {
          return name.includes('mouse') || name.includes('gamepad');
        }
        if (category.toLowerCase() === 'headsets') {
          return name.includes('headset');
        }
        if (category.toLowerCase() === 'monitores') {
          return name.includes('monitor') || name.includes('tv');
        }
        if (category.toLowerCase() === 'microfones') {
          return name.includes('microfone');
        }
        return false;
      });
      return filteredProducts.map(product =>
        this.mapProductToAppFormat(product, category)
      );
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw new Error('Não foi possível carregar os produtos da categoria');
    }
  }
}

// Exporta uma instância única do serviço
export default new ProductService();
