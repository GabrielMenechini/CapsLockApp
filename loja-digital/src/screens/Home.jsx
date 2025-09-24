import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
    const categorias = [
        { nome: 'Mouses e Gamepad', icone: 'game-controller-outline', cor: '#e74c3c' },
        { nome: 'Headsets', icone: 'headset-outline', cor: '#3498db' },
        { nome: 'Monitores', icone: 'tv-outline', cor: '#2ecc71' },
        { nome: 'Microfones', icone: 'mic-outline', cor: '#f39c12' }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Bem-vindo à</Text>
                <Text style={styles.storeName}>CAPS LOCK</Text>
                <Text style={styles.subtitle}>Encontre os melhores produtos gamer</Text>
            </View>

            <View style={styles.categoriesSection}>
                <View style={styles.categoriesHeader}>
                    <Text style={styles.sectionTitle}>Categorias</Text>
                    <Text style={styles.sectionSubtitle}>Explore nossos produtos por categoria</Text>
                </View>

                <View style={styles.categoriesGrid}>
                    {categorias.map((categoria, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryCard, { backgroundColor: categoria.cor }]}
                            onPress={() => navigation.navigate('Categoria', {categoria: categoria.nome})}
                            activeOpacity={0.8}
                        >
                            <View style={styles.categoryIcon}>
                                <Ionicons name={categoria.icone} size={32} color="#ffffff" />
                            </View>
                            <Text style={styles.categoryName}>{categoria.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    welcomeText: {
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 4,
    },
    storeName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        color: '#95a5a6',
        textAlign: 'center',
    },
    categoriesSection: {
        padding: 20,
    },
    categoriesHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
        textAlign: 'center',
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 24,
        textAlign: 'center',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    categoryIcon: {
        marginBottom: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 16,
        borderRadius: 50,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
    },
});
