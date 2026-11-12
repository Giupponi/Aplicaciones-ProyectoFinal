// Este archivo se encarga de guardar el usuario registrado y validar el inicio de sesión.
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Usuario {
    nombre: string;
    email: string;
    password: string;
    fotoPerfil: string | null;
    fechaRegistro: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    cargandoUsuario: boolean;
    errorCargaUsuario: boolean;
    registrarUsuario: (datos: Omit<Usuario, 'fechaRegistro'>) => Promise<void>;
    iniciarSesion: (email: string, password: string) => boolean;
    actualizarFotoPerfil: (uri: string) => void;
    cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CLAVE_USUARIO = 'usuario';

const esUsuario = (valor: unknown): valor is Usuario =>
    typeof valor === 'object' &&
    valor !== null &&
    'nombre' in valor &&
    typeof valor.nombre === 'string' &&
    'email' in valor &&
    typeof valor.email === 'string' &&
    'password' in valor &&
    typeof valor.password === 'string' &&
    'fotoPerfil' in valor &&
    (typeof valor.fotoPerfil === 'string' || valor.fotoPerfil === null) &&
    'fechaRegistro' in valor &&
    typeof valor.fechaRegistro === 'string';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [errorCargaUsuario, setErrorCargaUsuario] = useState(false);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const datosGuardados = await AsyncStorage.getItem(CLAVE_USUARIO);
                if (datosGuardados) {
                    const usuarioGuardado: unknown = JSON.parse(datosGuardados);
                    if (!esUsuario(usuarioGuardado)) {
                        throw new Error('Los datos guardados no son válidos.');
                    }
                    setUsuario(usuarioGuardado);
                }
            } catch (error) {
                console.error('No se pudo cargar la cuenta guardada:', error);
                setErrorCargaUsuario(true);
            } finally {
                setCargandoUsuario(false);
            }
        };

        void cargarUsuario();
    }, []);

    const registrarUsuario = async (datos: Omit<Usuario, 'fechaRegistro'>) => {
        const nuevoUsuario: Usuario = {
            ...datos,
            fechaRegistro: new Date().toLocaleDateString('es-ES', {
                month: 'long',
                year: 'numeric',
            }),
        };

            await AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(nuevoUsuario));
            setUsuario(nuevoUsuario);
    };

    const iniciarSesion = (email: string, password: string): boolean => {
        if (
            usuario &&
            usuario.email.trim().toLowerCase() === email.trim().toLowerCase() &&
            usuario.password === password
        ) {
            return true;
        }

        return false;
    };

    const actualizarFotoPerfil = (uri: string) => {
        if (usuario) {
            setUsuario({ ...usuario, fotoPerfil: uri });
        }
    };

    const cerrarSesion = () => {
        // El usuario registrado permanece disponible para poder iniciar sesión otra vez.
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                cargandoUsuario,
                errorCargaUsuario,
                registrarUsuario,
                iniciarSesion,
                actualizarFotoPerfil,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};