// Formulario con campos de email y contraseña, botón de ingreso y enlace a registrarse.
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';

type LoginNavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

export const PantallaLogin = () => {
    const navigation = useNavigation<LoginNavegacionProp>();
    const { iniciarSesion, cargandoUsuario, errorCargaUsuario } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const manejarInicioSesion = () => {
        if (cargandoUsuario) return;
        if (errorCargaUsuario) {
            setError('No se pudo cargar la cuenta guardada. Cerrá y volvé a abrir la app.');
            return;
        }

        if (email.trim() === '' || password.trim() === '') {
            setError('Por favor ingresá tu email y contraseña.');
            return;
        }

        const exito = iniciarSesion(email, password);

        if (!exito) {
            setError('El correo o la contraseña son incorrectos. Si aún no tenés cuenta, registrate.');
            return;
        }

        setError('');
        navigation.reset({
            index: 0,
            routes: [{ name: 'PestañasPrincipales' }],
        });
    };

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <View style={styles.encabezado}>
                <Ionicons name="game-controller" size={80} color={colores.primario} />
                <Text style={styles.titulo}>Blue Whale</Text>
                <Text style={styles.subtitulo}>Ingresá para gestionar tu colección</Text>
            </View>

            <View style={styles.formulario}>
                <View style={styles.campo}>
                    <Text style={styles.etiqueta}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ejemplo@email.com"
                        placeholderTextColor={colores.textoSecundario}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            setError('');
                        }}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.etiqueta}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        //placeholder="••••••••"
                        //placeholderTextColor={colores.textoSecundario}
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            setError('');
                        }}
                    />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                    style={styles.botonIngresar}
                    onPress={manejarInicioSesion}
                    disabled={cargandoUsuario}
                >
                    <Text style={styles.textoBotonIngresar}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botonRegistrarse}
                    onPress={() => navigation.navigate('PantallaRegistro')}
                >
                    <Text style={styles.textoBotonRegistrarse}>
                        ¿No tenés cuenta? <Text style={styles.textoEnlace}>Registrate acá</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: colores.fondo },
    contenido: { padding: 24, justifyContent: 'center', minHeight: '100%' },
    encabezado: { alignItems: 'center', marginBottom: 40 },
    titulo: { color: colores.textoPrincipal, fontSize: 32, fontWeight: 'bold', marginTop: 12 },
    subtitulo: { color: colores.textoSecundario, fontSize: 14, marginTop: 4 },
    formulario: { width: '100%' },
    campo: { marginBottom: 20 },
    etiqueta: { color: colores.textoSecundario, fontSize: 14, fontWeight: '600', marginBottom: 8 },
    input: {
        backgroundColor: colores.tarjetaFondo,
        color: colores.textoPrincipal,
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    botonIngresar: {
        backgroundColor: colores.primario,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotonIngresar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    botonRegistrarse: { marginTop: 24, alignItems: 'center' },
    textoBotonRegistrarse: { color: colores.textoSecundario, fontSize: 14 },
    textoEnlace: { color: colores.primario, fontWeight: 'bold' },
    error: { color: colores.peligro, fontSize: 14, marginBottom: 12 },
});