// Formulario con nombre, email, contraseña y validación de campos.
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';

type RegistroNavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

export const PantallaRegistro = () => {
    const navigation = useNavigation<RegistroNavegacionProp>();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { registrarUsuario } = useAuth();

    const manejarRegistro = () => {
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError('Completá todos los campos para registrarte.');
            return;
        }

        registrarUsuario({
            nombre: nombre.trim(),
            email: email.trim(),
            password,
            fotoPerfil: null,
        });

        navigation.reset({
            index: 0,
            routes: [{ name: 'PestañasPrincipales' }],
        });
    };

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <Text style={styles.titulo}>Crear Cuenta</Text>
            <Text style={styles.subtitulo}>Registrate para empezar a llevar el control de tus juegos</Text>

            <View style={styles.formulario}>
                <View style={styles.campo}>
                    <Text style={styles.etiqueta}>Nombre de Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Gamer123"
                        placeholderTextColor={colores.textoSecundario}
                        value={nombre}
                        onChangeText={(value) => {
                            setNombre(value);
                            setError('');
                        }}
                    />
                </View>

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

                <TouchableOpacity style={styles.botonRegistrar} onPress={manejarRegistro}>
                    <Text style={styles.textoBotonRegistrar}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoVolver}>¿Ya tenés cuenta? Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: { flex: 1, backgroundColor: colores.fondo },
    contenido: { padding: 24, justifyContent: 'center', minHeight: '100%' },
    titulo: { color: colores.textoPrincipal, fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
    subtitulo: { color: colores.textoSecundario, fontSize: 14, marginBottom: 32 },
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
    botonRegistrar: {
        backgroundColor: colores.primario,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotonRegistrar: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    botonVolver: { marginTop: 20, alignItems: 'center' },
    textoVolver: { color: colores.textoSecundario, fontSize: 14 },
    error: { color: colores.peligro, fontSize: 14, marginBottom: 12 },
});