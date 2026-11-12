import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Juego } from '../types/juego';
import { colores } from '../styles/colores';

interface PropsTarjetaJuego {
    juego: Juego;
    onPresionar: (id: string) => void;
}

export const TarjetaJuego: React.FC<PropsTarjetaJuego> =({ juego, onPresionar }) => {
    // Color dinámico según el estado del juego
    const obtenerColorEstado = (estado: string) => {
        switch (estado) {
            case 'Jugando':
                return colores.primario;
            case 'Completado':
                return colores.exito;
            case 'Pendiente':
                return colores.acento;
            default:
                return colores.peligro;
        }
    };

    return (
        <TouchableOpacity
            style={styles.tarjeta}
            activeOpacity={0.7}
            onPress={() => onPresionar(juego.id)}
        >
            <View style={styles.encabezado}>
                <Text style={styles.titulo} numberOfLines={1}>
                    {juego.titulo}
                </Text>
                <View style={[styles.insigniaEstado, { backgroundColor: obtenerColorEstado(juego.estado) }]}>
                    <Text style={styles.textoEstado}>{juego.estado}</Text>
                </View>
            </View>

            <View style={styles.detalles}>
                <Text style={styles.textoDetalle}>🎮 {juego.plataforma}</Text>
                <Text style={styles.textoDetalle}>⏱️ {juego.horasJugadas} hs</Text>
                {juego.valoracion && (
                    <Text style={styles.textoDetalle}>⭐ {juego.valoracion}/5 </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colores.tarjetaFondo,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colores.primario,
    },
    encabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titulo: {
        color: colores.textoPrincipal,
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },

    insigniaEstado: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    textoEstado: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    detalles: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 4,
    },
    textoDetalle: {
        color: colores.textoSecundario,
        fontSize: 13,
    },
});