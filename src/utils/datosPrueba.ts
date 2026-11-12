import { Juego } from '../types/juego';
// Archivo para probar la interfaz
export const JUEGOS_INICIALES: Juego[] = [
    {
        id: '1',
        titulo: 'The Legend of Zelda: Tears of the Kingdom',
        plataforma: 'Nintendo Switch',
        estado: 'Jugando',
        horasJugadas: 45,
        valoracion: 5,
        notas: 'Explorando las islas del cielo. Increíble juego.',
    },

    {
        id: '2',
        titulo: 'God of War Ragnarök',
        plataforma: 'PlayStation',
        estado: 'Completado',
        horasJugadas: 60,
        valoracion: 5,
        notas: 'Historia principal y misiones secundarias terminadas.',
    },

    {
        id: '3',
        titulo: 'Elden Ring',
        plataforma: 'PC',
        estado: 'Pendiente',
        horasJugadas: 0,
        valoracion: 4,
    },
];