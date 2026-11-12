// Muestra el avatar, la información del usuario, los botones para foto y cerrar sesión
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ListaParametrosStack } from '../navigation/NavegadorPrincipal';
import { colores } from '../styles/colores';

type PerfilNavegacionProp = NativeStackNavigationProp<ListaParametrosStack>;

export const PantallaPerfil = () => {
    const { usuario, actualizarFotoPerfil } = useAuth();
    const navigation = useNavigation<PerfilNavegacionProp>();
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(usuario?.fotoPerfil ?? null);

    useEffect(() => {
        setFotoPerfil(usuario?.fotoPerfil ?? null);
    }, [usuario?.fotoPerfil]);

    const fotoActual = fotoPerfil ?? usuario?.fotoPerfil ?? null;

    const tomarFoto = async () => {
        const permiso = await ImagePicker.requestCameraPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert(
                'Permiso denegado',
                'Necesitamos permiso para acceder a la cámara de tu celular.'
            );
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!resultado.canceled && resultado.assets[0]?.uri) {
            const uri = resultado.assets[0].uri;
            setFotoPerfil(uri);
            actualizarFotoPerfil(uri);
        }
    };

    const elegirDeGaleria = async () => {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert(
                'Permiso denegado',
                'Necesitamos permiso para acceder a tus fotos.'
            );
            return;
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!resultado.canceled && resultado.assets[0]?.uri) {
            const uri = resultado.assets[0].uri;
            setFotoPerfil(uri);
            actualizarFotoPerfil(uri);
        }
    };

    const cerrarSesion = () => {
        Alert.alert('Cerrar Sesión', '¿Estás seguro de que querés salir?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Salir',
                style: 'destructive',
                onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'PantallaLogin' }],
                    });
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
            <Text style={styles.tituloPantalla}>👤 Mi Perfil</Text>

            <View style={styles.contenedorFoto}>
                {fotoActual ? (
                    <Image source={{ uri: fotoActual }} style={styles.foto} />
                ) : (
                    <View style={styles.fotoPlaceholder}>
                        <Ionicons name="person" size={70} color={colores.textoSecundario} />
                    </View>
                )}

                <View style={styles.contenedorBotonesFoto}>
                    <TouchableOpacity style={styles.botonCamara} onPress={tomarFoto}>
                        <Ionicons name="camera" size={18} color="#ffffff" />
                        <Text style={styles.textoBotonCamara}>Tomar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botonGaleria} onPress={elegirDeGaleria}>
                        <Ionicons name="images" size={18} color="#ffffff" />
                        <Text style={styles.textoBotonCamara}>Galería</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tarjetaInfo}>
                <View style={styles.campoInfo}>
                    <Text style={styles.etiqueta}>Nombre de Usuario</Text>
                    <Text style={styles.valor}>{usuario?.nombre ?? 'Sin registrar'}</Text>
                </View>
                <View style={styles.divisor} />
                <View style={styles.campoInfo}>
                    <Text style={styles.etiqueta}>Correo Electrónico</Text>
                    <Text style={styles.valor}>{usuario?.email ?? 'ejemplo@email.com'}</Text>
                </View>
                <View style={styles.divisor} />
                <View style={styles.campoInfo}>
                    <Text style={styles.etiqueta}>Miembro desde</Text>
                    <Text style={styles.valor}>{usuario?.fechaRegistro ?? 'Reciente'}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.botonCerrarSesion} onPress={cerrarSesion}>
                <Ionicons name="log-out-outline" size={20} color="#ffffff" />
                <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colores.fondo,
    },
    contenido: {
        padding: 16,
        alignItems: 'center',
    },
    tituloPantalla: {
        color: colores.textoPrincipal,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        alignSelf: 'flex-start',
    },
    contenedorFoto: {
        alignItems: 'center',
        marginBottom: 24,
    },
    foto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: colores.primario,
    },
    fotoPlaceholder: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colores.tarjetaFondo,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#334155',
    },
    contenedorBotonesFoto: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
    },
    botonCamara: {
        backgroundColor: colores.primario,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    botonGaleria: {
        backgroundColor: '#334155',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    textoBotonCamara: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
    tarjetaInfo: {
        width: '100%',
        backgroundColor: colores.tarjetaFondo,
        borderRadius: 14,
        padding: 16,
        marginBottom: 24,
    },
    campoInfo: {
        paddingVertical: 6,
    },
    etiqueta: {
        color: colores.textoSecundario,
        fontSize: 13,
        marginBottom: 2,
    },
    valor: {
        color: colores.textoPrincipal,
        fontSize: 16,
        fontWeight: 'bold',
    },
    divisor: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 8,
    },
    botonCerrarSesion: {
        width: '100%',
        backgroundColor: colores.peligro,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        gap: 8,
    },
    textoCerrarSesion: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
