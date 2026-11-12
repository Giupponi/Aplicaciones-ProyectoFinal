// Este archivo se encarga de guardar el usuario registrado y validar el inicio de sesión.
import React, { createContext, useContext, useState } from 'react';

export interface Usuario {
    nombre: string;
    email: string;
    password: string;
    fotoPerfil: string | null;
    fechaRegistro: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    registrarUsuario: (datos: Omit<Usuario, 'fechaRegistro'>) => void;
    iniciarSesion: (email: string, password: string) => boolean;
    actualizarFotoPerfil: (uri: string) => void;
    cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const registrarUsuario = (datos: Omit<Usuario, 'fechaRegistro'>) => {
        const nuevoUsuario: Usuario = {
            ...datos,
            fechaRegistro: new Date().toLocaleDateString('es-ES', {
                month: 'long',
                year: 'numeric',
            }),
        };

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