import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { TarjetaJuego } from '../components/TarjetaJuego';
import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';
import { useJuegos } from '../context/JuegosContext';

type NavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

export const PantallaInicio = () => {
    const navigation = useNavigation<NavegacionProp>();
    const { juegos } = useJuegos();

    const irADetalle = (idJuego: string) => {
        navigation.navigate('PantallaDetalle', { idJuego });
    };

    const irAAgregar = () => {
        navigation.navigate('PantallaAgregarJuego', {});
    };

    return (
        <View style={styles.contenedor}>
            <FlatList
                data={juegos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TarjetaJuego juego={item} onPresionar={irADetalle} />
                )}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <View style={styles.vacio}>
                        <Text style={styles.textoVacio}>No tenés juegos guardados aún.</Text>
                    </View>
                }
            />

            {/* Botón Flotante (FAB) para agregar juego */}
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Agregar juego"
                style={styles.botonFlotante}
                onPress={irAAgregar}
            >
                <Ionicons name="add" size={28} color="#ffffff" /> 
            </TouchableOpacity>
        </View>   
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colores.fondo,
    },
    lista: {
        padding: 16,
    },

    vacio: {
        padding: 32,
        alignItems: 'center',
    },

    textoVacio: {
        color: colores.textoSecundario,
        fontSize: 16,
    },
    botonFlotante: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colores.primario,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
