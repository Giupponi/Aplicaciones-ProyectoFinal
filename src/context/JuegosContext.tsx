import React, { createContext, useState, useContext } from 'react';
import { JUEGOS_INICIALES } from '../utils/datosPrueba';
import { Juego } from '../types/juego';

interface JuegosContextType {
    juegos: Juego[];
    agregarJuego: (juego: Omit<Juego, 'id'>) => void;
    actualizarJuego: (id: string, juego: Omit<Juego, 'id'>) => void;
    eliminarJuego: (id: string) => void;
}

const JuegosContext = createContext<JuegosContextType | undefined>(undefined);

export const JuegosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [juegos, setJuegos] = useState<Juego[]>(JUEGOS_INICIALES);

    const agregarJuego = (nuevoJuego: Omit<Juego, 'id'>) => {
        const juegoConId: Juego = {
            ...nuevoJuego,
            id: Date.now().toString(),
        };
        setJuegos((prevJuegos) => [juegoConId, ...prevJuegos]);
    };

    const actualizarJuego = (id: string, cambios: Omit<Juego, 'id'>) => {
        setJuegos((prevJuegos) =>
            prevJuegos.map((juego) => juego.id === id ? { ...cambios, id } : juego)
        );
    };

    const eliminarJuego = (id: string) => {
        setJuegos((prevJuegos) => prevJuegos.filter((juego) => juego.id !== id));
    };

    return (
        <JuegosContext.Provider value={{ juegos, agregarJuego, actualizarJuego, eliminarJuego }}>
            {children}
        </JuegosContext.Provider>
    );
};

export const useJuegos = () => {
    const context = useContext(JuegosContext);
    if (!context) {
        throw new Error('useJuegos debe usarse dentro de un JuegosProvider');
    }
    return context;
};
