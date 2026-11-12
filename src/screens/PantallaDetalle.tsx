import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';
import { useJuegos } from '../context/JuegosContext';

type DetalleRutaProp = RouteProp<ListaParametrosStack, 'PantallaDetalle'>;
type DetalleNavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

export const PantallaDetalle = () => {
    const route = useRoute<DetalleRutaProp>();
    const navigation = useNavigation<DetalleNavegacionProp>();
    const { juegos, eliminarJuego } = useJuegos();
    const { idJuego } = route.params || {};

    // Buscamos el juego seleccionado
    const juego = juegos.find((j) => j.id === idJuego);

    if (!juego) {
        return (
            <View style={[styles.contenedor, styles.juegoNoEncontrado]}>
                <Text style={styles.textoNotas}>No se encontró este juego en tu colección.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.botonVolver}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const confirmarEliminacion = () => {
        const borrarJuego = () => {
            eliminarJuego(juego.id);
            navigation.goBack();
        };

        if (Platform.OS === 'web') {
            const confirmado = globalThis.confirm(
                `¿Estás seguro de que querés borrar "${juego.titulo}" de tu colección?`
            );
            if (confirmado) {
                borrarJuego();
            }
            return;
        }

        Alert.alert(
            'Eliminar Videojuego',
            `¿Estás seguro de que querés borrar "${juego.titulo}" de tu colección?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: borrarJuego,
                },
            ]
        );
    };        

    const irAEditar = () => {
        navigation.navigate('PantallaAgregarJuego', { idJuego: juego.id });
    };

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <View style={styles.tarjetaFicha}>
                <Text style={styles.titulo}>{juego.titulo}</Text>

                <View style={styles.filaInsignias}>
                    <View style={styles.insigniaPlataforma}>
                        <Text style={styles.textoInsignia}>🎮 {juego.plataforma}</Text>
                    </View>
                    <View style={styles.insigniaEstado}>
                        <Text style={styles.textoInsignia}>📌 {juego.estado}</Text>
                    </View>
                </View>

                <View style={styles.divisor} />

                <View style={styles.seccionInfo}>
                    <Text style={styles.etiqueta}>Tiempo Jugado</Text>
                    <Text style={styles.valor}>⏱️ {juego.horasJugadas} horas</Text>
                </View>

                {juego.valoracion && (
                    <View style={styles.seccionInfo}>
                        <Text style={styles.etiqueta}>Valoración Personal</Text>
                        <Text style={styles.valor}>⭐ {juego.valoracion} / 5</Text>
                    </View>
                )}

                {juego.notas && (
                    <View style={styles.seccionInfo}>
                        <Text style={styles.etiqueta}>Notas y Comentarios</Text>
                        <Text style={styles.textoNotas}>{juego.notas}</Text>
                    </View>
                )}
            </View>

            {/* Botones de Acción */}
            <View style={styles.contenedorBotones}>
                <TouchableOpacity style={styles.botonEditar} onPress={irAEditar}>
                    <Ionicons name="create-outline" size={20} color="#ffffff" />
                    <Text style={styles.textoBoton}>Editar Juego</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonEliminar} onPress={confirmarEliminacion}>
                    <Ionicons name="trash-outline" size={20} color="#ffffff" />
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: colores.fondo },
    contenido: { padding: 16 },
    tarjetaFicha: {
        backgroundColor: colores.tarjetaFondo,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    titulo: { color: colores.textoPrincipal, fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    filaInsignias: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    insigniaPlataforma: { backgroundColor: '#334155', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    insigniaEstado: { backgroundColor: colores.primario, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    textoInsignia: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
    divisor: { height: 1, backgroundColor: '#334155', marginVertical: 12 },
    seccionInfo: { marginBottom: 16 },
    etiqueta: { color: colores.textoSecundario, fontSize: 13, marginBottom: 4 },
    valor: { color: colores.textoPrincipal, fontSize: 16, fontWeight: 'bold' },
    textoNotas: { color: colores.textoPrincipal, fontSize: 15, lineHeight: 22 },
    juegoNoEncontrado: { justifyContent: 'center', alignItems: 'center', gap: 12 },
    botonVolver: { color: colores.primario, fontSize: 16, fontWeight: 'bold' },
    contenedorBotones: { flexDirection: 'row', gap: 12 },
    botonEditar: {
        flex: 1,
        backgroundColor: colores.primario,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        gap: 6,
    },
    botonEliminar: {
        flex: 1,
        backgroundColor: colores.peligro,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        gap: 6,
    },
    textoBoton: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
});