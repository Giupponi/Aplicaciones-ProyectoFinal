export type Plataforma = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo Switch' |
'Mobile' | 'Otro';

export type EstadoJuego = 'Pendiente' | 'Jugando' | 'Completado' | 'Abandonado';

export interface Juego {
    id: string;
    titulo: string;
    plataforma: Plataforma;
    estado: EstadoJuego;
    horasJugadas: number;
    valoracion?: number; // 1 a 5 estrellas
    portadaUri?: string; // Imagen de portada
    notas?: string;
}