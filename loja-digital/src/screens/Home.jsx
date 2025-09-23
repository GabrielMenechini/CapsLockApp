import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
    const categorias = ['Mouses', 'Headsets', 'Teclados', 'Microfones'];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione a Categoria</Text>

                
            {categorias.map((categoria, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => navigation.navigate('Categoria', {categoria})}
                >
                    <Text style={styles.buttonText}>{categoria}</Text>
                </TouchableOpacity>
            ))}
        </View>
    ); 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#356dfaff',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
});
