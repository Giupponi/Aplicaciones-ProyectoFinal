import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Juego, Plataforma, EstadoJuego } from '../types/juego';
import { useJuegos } from '../context/JuegosContext';
import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';

type AgregarRutaProp = RouteProp<ListaParametrosStack, 'PantallaAgregarJuego'>;
type AgregarNavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

const PLATAFORMAS: Plataforma[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Otro'];
const ESTADOS: EstadoJuego[] = ['Pendiente', 'Jugando', 'Completado', 'Abandonado'];

export const PantallaAgregarJuego = () => {
    const route = useRoute<AgregarRutaProp>();
    const navigation = useNavigation<AgregarNavegacionProp>();
    const { juegos, agregarJuego, actualizarJuego } = useJuegos();
    const { idJuego } = route.params || {};

    const esEdicion = Boolean(idJuego);
    // Si es edición, cargamos los datos existentes
    const juegoInicial = esEdicion ? juegos.find((j) => j.id === idJuego) : undefined;
    const [error, setError] = useState('');

    const [titulo, setTitulo] = useState(juegoInicial?.titulo ?? '');
    const [plataforma, setPlataforma] = useState<Plataforma>(juegoInicial?.plataforma ?? 'PC');
    const [estado, setEstado] = useState<EstadoJuego>(juegoInicial?.estado ?? 'Pendiente');
    const [horas, setHoras] = useState(juegoInicial?.horasJugadas.toString() ?? '');
    const [valoracion, setValoracion] = useState(juegoInicial?.valoracion?.toString() ?? '');
    const [notas, setNotas] = useState(juegoInicial?.notas ?? '');

    const guardarJuego = () => {
        if (titulo.trim() === '') {
            setError('Ingresá el título del videojuego.');
            return;
        }

        const horasNumero = horas.trim() === '' ? 0 : Number(horas);
        if (!Number.isFinite(horasNumero) || horasNumero < 0) {
            setError('Las horas deben ser un número igual o mayor que cero.');
            return;
        }

        const valoracionNumero = valoracion.trim() === '' ? undefined : Number(valoracion);
        if (
            valoracionNumero !== undefined &&
            (!Number.isInteger(valoracionNumero) || valoracionNumero < 1 || valoracionNumero > 5)
        ) {
            setError('La valoración debe ser un número entero entre 1 y 5.');
            return;
        }

        const datosJuego: Omit<Juego, 'id'> = {
            titulo: titulo.trim(),
            plataforma,
            estado,
            horasJugadas: horasNumero,
            valoracion: valoracionNumero,
            notas: notas.trim() || undefined,
        };

        if (esEdicion && idJuego) {
            actualizarJuego(idJuego, datosJuego);
        } else {
            agregarJuego(datosJuego);
        }

        setError('');
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <Text style={styles.tituloPantalla}>
                {esEdicion ? '✏️ Editar Videojuego' : '➕ Agregar Nuevo Videojuego'}
            </Text>

            {/* Titulo */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Título del Juego *</Text>
                <TextInput
                    style={styles.input} placeholder="Ej: Zelda: Breath of the Wild"
                    placeholderTextColor={colores.textoSecundario}
                    value={titulo}
                    onChangeText={(value) => {
                        setTitulo(value);
                        setError('');
                    }}
                    />
            </View>

            {/* Plataforma */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Plataforma</Text>
                <View style={styles.contenedorOpciones}>
                    {PLATAFORMAS.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[styles.chip, plataforma === item && styles.chipSeleccionado]}
                            onPress={() => setPlataforma(item)}
                            >
                            <Text style={[styles.textoChip, plataforma === item && styles.textoChipSeleccionado]}>
                                {item}
                            </Text>
                            </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Estado */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Estado actual</Text>
                <View style={styles.contenedorOpciones}>
                    {ESTADOS.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[styles.chip, estado === item && styles.chipSeleccionado]}
                            onPress={() => setEstado(item)}
                            >
                            <Text style={[styles.textoChip, estado === item && styles.textoChipSeleccionado]}>
                                {item}   
                            </Text>
                        </TouchableOpacity>
                    ))} 
                </View>
            </View>

            {/* Horas Jugadas */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Horas Jugadas</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: 25"
                    placeholderTextColor={colores.textoSecundario}
                    keyboardType="numeric"
                    value={horas}
                    onChangeText={(value) => {
                        setHoras(value);
                        setError('');
                    }}
                    />
            </View>

            {/* Valoracion */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Valoración (1 a 5 estrellas)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: 5"
                    placeholderTextColor={colores.textoSecundario}
                    keyboardType="numeric"
                    value={valoracion}
                    onChangeText={(value) => {
                        setValoracion(value);
                        setError('');
                    }}
                />
            </View>

            {/* Notas */}
            <View style={styles.campo}>
                <Text style={styles.etiqueta}>Notas / Comentarios</Text>
                <TextInput
                    style={[styles.input, styles.inputMultilinea]}
                    placeholder="Escribí tu opinión o recordatorios..."
                    placeholderTextColor={colores.textoSecundario}
                    multiline
                    numberOfLines={4}
                    value={notas}
                    onChangeText={setNotas}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Botón Guardar */}
            <TouchableOpacity style={styles.botonGuardar} onPress={guardarJuego}>
                <Text style={styles.textoBotonGuardar}>
                    {esEdicion ? 'Guardar Cambios' : 'Agregar a la Colección'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: colores.fondo },
    contenido: { padding: 16 },
    tituloPantalla: { color: colores.textoPrincipal, fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    campo: { marginBottom: 16 },
    etiqueta: { color: colores.textoSecundario, fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: {
        backgroundColor: colores.tarjetaFondo,
        color: colores.textoPrincipal,
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    inputMultilinea: { height: 90, textAlignVertical: 'top' },
    contenedorOpciones: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
        backgroundColor: colores.tarjetaFondo,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    chipSeleccionado: { backgroundColor: colores.primario, borderColor: colores.primario },
    textoChip: { color: colores.textoSecundario, fontSize: 13 },
    textoChipSeleccionado: { color: '#ffffff', fontWeight: 'bold' },
    botonGuardar: {
        backgroundColor: colores.primario,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    textoBotonGuardar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    error: { color: colores.peligro, fontSize: 14, marginBottom: 8 },
});