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
    const [cuentaRegistrada, setCuentaRegistrada] = useState<Usuario | null>(null);

    const registrarUsuario = (datos: Omit<Usuario, 'fechaRegistro'>) => {
        const nuevoUsuario: Usuario = {
            ...datos,
            fechaRegistro: new Date().toLocaleDateString('es-ES', {
                month: 'long',
                year: 'numeric',
            }),
        };

        setUsuario(nuevoUsuario);
        setCuentaRegistrada(nuevoUsuario);
    };

    const iniciarSesion = (email: string, password: string): boolean => {
        if (
            cuentaRegistrada &&
            cuentaRegistrada.email.trim().toLowerCase() === email.trim().toLowerCase() &&
            cuentaRegistrada.password === password
        ) {
            setUsuario(cuentaRegistrada);
            return true;
        }

        return false;
    };

    const actualizarFotoPerfil = (uri: string) => {
        if (usuario) {
            const usuarioActualizado = { ...usuario, fotoPerfil: uri };
            setUsuario(usuarioActualizado);
            setCuentaRegistrada(usuarioActualizado);
        }
    };

    const cerrarSesion = () => {
        setUsuario(null);
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