import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { PantallaLogin } from '../screens/PantallaLogin';
import { PantallaRegistro } from '../screens/PantallaRegistro';
import { PantallaInicio } from '../screens/PantallaInicio';
import { PantallaEstadisticas } from '../screens/PantallaEstadisticas';
import { PantallaPerfil } from '../screens/PantallaPerfil';
import { PantallaDetalle } from '../screens/PantallaDetalle';
import { PantallaAgregarJuego } from '../screens/PantallaAgregarJuego';
import { colores } from '../styles/colores';

export type ListaParametrosStack = {
    PantallaLogin: undefined;
    PantallaRegistro: undefined;
    PestañasPrincipales: undefined;
    PantallaDetalle: { idJuego: string } | undefined;
    PantallaAgregarJuego: { idJuego?: string } | undefined;
};

export type ListaParametrosTabs = {
    Colección: undefined;
    Estadísticas: undefined;
    Perfil: undefined;
};

const Stack = createNativeStackNavigator<ListaParametrosStack>();
const Tab = createBottomTabNavigator<ListaParametrosTabs>();

// Navegador de Pestañas Inferiores
const NavegadorTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: colores.tarjetaFondo },
                headerTintColor: colores.textoPrincipal,
                tabBarStyle: {
                    backgroundColor: colores.tarjetaFondo,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colores.primario,
                tabBarInactiveTintColor: colores.textoSecundario,
                tabBarIcon: ({ color, size }) => {
                    let nombreIcono: keyof typeof Ionicons.glyphMap = 'game-controller';

                    if (route.name === 'Colección') {
                        nombreIcono = 'game-controller';
                    } else if (route.name === 'Estadísticas') {
                        nombreIcono = 'stats-chart';  
                    } else if (route.name === 'Perfil') {
                        nombreIcono = 'person';
                    }

                return <Ionicons name={nombreIcono} size={size} color={color} />;
            },
        })}
    >

        <Tab.Screen
            name="Colección"
            component={PantallaInicio}
            options={{ title: 'Mi coleccion' }}
            />
        
        <Tab.Screen
            name="Perfil"
            component={PantallaPerfil}
            options={{ title: 'Mi Perfil' }}
            />
    </Tab.Navigator>
    );
};

// Navegador Principal 
// Formularios de iniciar sesion y registro linea70 hasta 89
export const NavegadorPrincipal = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="PantallaLogin"
                screenOptions={{
                    headerStyle: { backgroundColor: colores.tarjetaFondo },
                    headerTintColor: colores.textoPrincipal,
                    contentStyle: { backgroundColor: colores.fondo },
                }}
            >
                <Stack.Screen
                    name="PantallaLogin"
                    component={PantallaLogin}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="PantallaRegistro"
                    component={PantallaRegistro}
                    options={{ title: 'Registro' }}
                />

                <Stack.Screen
                    name="PestañasPrincipales"
                    component={NavegadorTabs}
                    options={{ headerShown: false}}
                />
                <Stack.Screen
                    name="PantallaDetalle"
                    component={PantallaDetalle}
                    options={{ title: 'Detalle del Juego' }}
                />
                <Stack.Screen
                    name="PantallaAgregarJuego"
                    component={PantallaAgregarJuego}
                    options={{ title: 'Nuevo Juego' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};