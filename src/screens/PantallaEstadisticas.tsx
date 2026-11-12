import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { JUEGOS_INICIALES } from '../utils/datosPrueba';
import { colores } from '../styles/colores';

export const PantallaEstadisticas = () => {
    const totalJuegos = JUEGOS_INICIALES.length;
    const totalHoras = JUEGOS_INICIALES.reduce((acc, juego) => acc + juego.horasJugadas, 0);
    const completados = JUEGOS_INICIALES.filter((juego) => juego.estado === 'Completado').length;
    const jugando = JUEGOS_INICIALES.filter((juego) => juego.estado === 'Jugando').length; const pendientes = JUEGOS_INICIALES.filter((juego) => juego.estado === 'Pendiente').length;

    // Conteo dinámico por plataforma
    const conteoPlataformas = JUEGOS_INICIALES.reduce((acc, juego) => {
        acc[juego.plataforma] = (acc[juego.plataforma] || 0) + 1;
        return acc;
    }, { } as Record<string, number>);

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <Text style={styles.tituloPantalla}> Resumen de tu Colección</Text>

            {/* Tarjetas de Métricas Principales */}
        <View style={styles.gridTarjetas}>
            <View style={styles.tarjetaMetrica}>
                <Ionicons name="game-controller" size={32} color={colores.primario} />
                <Text style={styles.numeroMetrica}>{totalJuegos}</Text>
                <Text style={styles.etiquetaMetrica}>Juegos Totales</Text>
            </View>

            <View style={styles.tarjetaMetrica}>
                <Ionicons name="time" size={32} color="#eab308" />
                <Text style={styles.numeroMetrica}>{totalHoras}h</Text>
                <Text style={styles.etiquetaMetrica}>Horas Acumuladas</Text>
            </View>
        </View>

            {/* Desglose por Estado */}
        <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>📌 Estado de tus Juegos</Text>
            <View style={styles.tarjetaSeccion}>
            <View style={styles.filaEstado}>
                <Text style={styles.textoFila}>🎮 En progreso (Jugando):</Text>
                <Text style={styles.valorFila}>{jugando}</Text>
            </View>

            <View style={styles.divisor} />
            <View style={styles.filaEstado}>
                <Text style={styles.textoFila}>✅ Completados:</Text>
                <Text style={styles.valorFila}>{completados}</Text>
            </View>
                    <View style={styles.divisor} />
                    <View style={styles.filaEstado}>
                        <Text style={styles.textoFila}>⏳ Pendientes de empezar:</Text>
                        <Text style={styles.valorFila}>{pendientes}</Text>
                    </View>
                </View>
            </View>

            {/* Desglose por Plataforma */}
            <View style={styles.seccion}>
                <Text style={styles.tituloSeccion}>💻 Juegos por Plataforma</Text>
                <View style={styles.tarjetaSeccion}>
                    {Object.entries(conteoPlataformas).map(([plataforma, cantidad], index) => (
                        <React.Fragment key={plataforma}>
                            {index > 0 && <View style={styles.divisor} />}
                            <View style={styles.filaEstado}>
                                <Text style={styles.textoFila}>{plataforma}</Text>
                                <Text style={styles.valorFila}>{cantidad} título(s)</Text>
                            </View>
                        </React.Fragment>
                    ))}
            </View>
        </View>
    </ScrollView>
    );
};

    const styles = StyleSheet.create({
        contenedor: {flex: 1, backgroundColor: colores.fondo },
        contenido: {padding: 16 },
        tituloPantalla: {color: colores.textoPrincipal, fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
        gridTarjetas: {flexDirection: 'row', gap: 12, marginBottom: 20 },
        tarjetaMetrica: {
            flex: 1,
            backgroundColor: colores.tarjetaFondo,
            borderRadius: 14,
            padding: 16,
            alignItems: 'center',
        },
        numeroMetrica: { color: colores.textoPrincipal, fontSize: 24, fontWeight: 'bold', marginVertical: 6 },
        etiquetaMetrica: { color: colores.textoSecundario, fontSize: 13 },
        seccion: { marginBottom: 20 },
        tituloSeccion: { color: colores.textoPrincipal, fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
        tarjetaSeccion: { backgroundColor: colores.tarjetaFondo, borderRadius: 14, padding: 16 },
        filaEstado: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
        textoFila: { color: colores.textoSecundario, fontSize: 14 },
        valorFila: { color: colores.textoPrincipal, fontSize: 14, fontWeight: 'bold' },
        divisor: { height: 1, backgroundColor: '#334155', marginVertical: 8 },
    });